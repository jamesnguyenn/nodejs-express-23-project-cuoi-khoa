const { successCode, errorCode, failCode } = require('../ulti/response');
const { PrismaClient } = require('@prisma/client');
const moment = require('moment');
const convertBase64 = require('../ulti/convertBase64');

const prisma = new PrismaClient();

const getBanner = async (req, res) => {
    try {
        const response = await prisma.banner.findMany();

        successCode(res, response);
    } catch (error) {
        console.log(error);
        failCode(res);
    }
};

const getMovieLists = async (req, res) => {
    try {
        const response = await prisma.movie.findMany();
        successCode(res, response);
    } catch (error) {}
};

const getMovieListsPagination = async (req, res) => {
    try {
        const {
            keywords = '', // all the response items will go in this array
            page = 1, // current page
            results_per_page = 20, // how many items available in "content"
        } = req.query;
        const response = await prisma.movie.findMany({
            skip: results_per_page * page - results_per_page,
            take: Number(results_per_page),
            where: {
                name: {
                    contains: `${keywords}`,
                },
            },
        });
        successCode(res, response);
    } catch (error) {
        console.log(error);
        failCode(res);
    }
};

const getMovieByDate = async (req, res) => {
    try {
        const { fromDate, toDate } = req.body;
        const response = await prisma.movie.findMany({
            where: {
                startDate: {
                    lte: new Date(toDate).toISOString(),
                    gte: new Date(fromDate).toISOString(),
                },
            },
        });
        successCode(res, response);
    } catch (error) {
        console.log(error);
        failCode(res);
    }
};

const uploadPosterMovie = async (req, res) => {
    try {
        const { id } = req.query;
        console.log(req.file)
        const dataImagePrefix = `data:image/png;base64,`
        const base64Photo = dataImagePrefix+  req.file.buffer.toString('base64')
        successCode(res,base64Photo)
        const isHaveMovie = await prisma.movie.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (!isHaveMovie || !id)
            return errorCode(res, 'Phim kh??ng t???n t???i vui l??ng th??? l???i.');
        const response = await prisma.movie.update({
            data: {
                poster: base64Photo,
            },
            where: {
                id: Number(id),
            },
        });
        successCode(res, response);
    } catch (error) {
        console.log(error);
        failCode(res);
    }
};

const editMovie = async (req, res) => {
    try {
        const { id, name, startDate, time, evaluate, poster, trailer } =
            req.body;
        const isHaveMovie = await prisma.movie.findFirst({
            where: {
                id,
            },
        });
        if (!isHaveMovie)
            return errorCode(res, 'D??? li???u kh??ng h???p l???. Vui l??ng th??? l???i');
        const response = await prisma.movie.update({
            data: {
                name,
                startDate: new Date(startDate).toISOString(),
                time: new Date(time).toISOString(),
                evaluate,
                poster,
                trailer,
            },
            where: {
                id,
            },
        });
        successCode(res, response);
    } catch (error) {
        console.log(error);
        failCode(res);
    }
};

const createMovie = async (req, res) => {
    try {
        const { name, startDate, time, evaluate, poster, trailer } = req.body;
        const response = await prisma.movie.create({
            data: {
                name,
                startDate: new Date(startDate).toISOString(),
                time: new Date(time).toISOString(),
                evaluate,
                poster,
                trailer,
            },
        });
        successCode(res, response);
    } catch (error) {
        console.log(error);
        failCode(res);
    }
};

const deleteMovie = async(req,res)=>{
    try {
        const {id} =req.query;
        const movieCinema = await prisma.cinema_movie.findFirst({
            where:{
                id: Number(id)
            }
        })
        if(movieCinema) {
            const deleteMovie = await prisma.cinema_movie.delete({
            where:{
                id:movieCinema.id
            }
        })
        } 
        const response= await prisma.movie.delete({
            where:{
                id:Number(id)
            }
        })
        successCode(res,response)
    } catch (error) {
        console.log(error);
        failCode(res)
    }
}

module.exports = {
    getBanner,
    getMovieLists,
    getMovieListsPagination,
    getMovieByDate,
    createMovie,
    editMovie,
    uploadPosterMovie,
    deleteMovie
};
