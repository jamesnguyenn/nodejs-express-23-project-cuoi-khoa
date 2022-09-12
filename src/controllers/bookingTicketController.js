const { successCode, errorCode, failCode } = require('../ulti/response');
const { PrismaClient } = require('@prisma/client');
const moment = require('moment');

const prisma = new PrismaClient();

const getCinemaLists = async (req, res) => {
    try {
        const response = await prisma.cinema.findMany();
        successCode(res, response);
    } catch (error) {
        failCode(res);
    }
};

const createShowTime = async (req, res) => {
    try {
        const { cinemaId, movieId, startTime } = req.body;
        const response = await prisma.cinema_movie.findFirst({
            where: {
                cinemaId,
                movieId,
            },
        });
        if (response) {
            const timeFormat = new Date(
                moment(startTime).format('DD-MM-YYYY HH:mm:ss')
            ).toISOString();
            console.log('🚀 ~ timeFormat', timeFormat);
            const isHaveTime = await prisma.showtime.findFirst({
                where: {
                    startTime: timeFormat,
                },
            });
            console.log(isHaveTime);
            if (isHaveTime)
                return res.status(400).json({
                    error: false,
                    message:
                        'Đã có lịch chiếu vào thời gian trên. Vui lòng thử lại',
                });

            const resp = await prisma.showtime.create({
                data: {
                    startTime: timeFormat,
                    cinemaId,
                },
            });
            if (resp) {
                successCode(res, resp);
            } else {
                res.status(400).json({
                    error: true,
                    message: 'Không thể tạo lịch chiếu. Vui lòng thử lại',
                });
            }
        } else {
            res.status(400).json({
                error: true,
                message:
                    'Không có rạp phim và phim theo dữ liệu. Vui lòng thử lại',
            });
        }
    } catch (error) {
        console.log(error);
        failCode(res);
    }
};

const bookingTicket = async (req, res) => {
    try {
        const { ticketLists, showTimeId } = req.body;
        const showTime = prisma.showtime.findFirst({
            where: {
                id: showTimeId,
            },
        });
        if (showTime) {
            const promise = ticketLists.map(async (item) => {
                const availableSeat = await prisma.seat.findFirst({
                    where: {
                        name: item.name,
                    },
                });
                return prisma.seat.update({
                    where: {
                        id: availableSeat.id,
                    },
                    data: {
                        status: !availableSeat.status,
                    },
                });
            });
            Promise.all(promise).then((value) =>
                successCode(res, { showTimeId, ticketLists: value })
            );
        } else {
            res.status(400).json({
                error: true,
                message: 'Không tìm thấy lịch chiếu. Vui lòng thử lại',
            });
        }
    } catch (error) {
        failCode(res);
    }
};

module.exports = {
    getCinemaLists,
    createShowTime,
    bookingTicket,
};
