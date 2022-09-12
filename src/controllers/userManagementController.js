const { successCode, errorCode, failCode } = require('../ulti/response');
const { PrismaClient } = require('@prisma/client');
require('dotenv');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');
const { checkToken } = require('../ulti/auth');
const saltRounds = 10;

const getRoleLists = async (req, res) => {
    try {
        const response = await prisma.role.findMany();
        successCode(res, response);
    } catch (error) {
        console.log(error)
        failCode(res);
    }
};

const getUserLists = async (req, res) => {
    try {
        const response = await prisma.user.findMany();
        successCode(res, response);
    } catch (error) {
        failCode(res);
    }
};

const getUserListsPagination = async (req, res) => {
    try {
        const {
            keywords = '', // all the response items will go in this array
            page = 1, // current page
            results_per_page = 20, // how many items available in "content"
        } = req.query;
        const response = await prisma.user.findMany({
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

const register = async (req, res) => {
    try {
        const { name, email, phone, password, roleId } = req.body;
        const checkEmailAndPhone = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { phone }],
            },
        });
        if (checkEmailAndPhone)
            return errorCode(res, 'Email/Số điện thoại đã tồn tại');
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) return failCode(res);
            const response = await prisma.user.create({
                data: {
                    name,
                    email,
                    phone,
                    password: hash,
                    roleId,
                },
            });
            successCode(res, response);
        });
    } catch (error) {
        console.log(error);
        failCode(res);
    }
};

const login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const checkPhone = await prisma.user.findFirst({
            where: {
                phone,
            },
        });
        if (!checkPhone) return errorCode(res, 'Số điện thoại không tồn tại');
        const checkPassword = bcrypt.compareSync(
            password,
            checkPhone?.password
        );
        if (!checkPassword)
            return errorCode(
                res,
                'Số điện thoại/Mật khẩu không đúng. Vui lòng thử lại'
            );
        const token = await jwt.sign(
            {
                data: {
                    name: checkPhone.name,
                    email: checkPhone.email,
                    phone: checkPhone.phone,
                    role: checkPhone.roleId,
                },
            },
            process.env.SECRET_KEY_JWT,
            { expiresIn: process.env.TIME_EXPIRED }
        );
        successCode(res, { message: 'Đăng nhập thành công', token: token });
    } catch (error) {
        failCode(res);
    }
};

const checkTokenRoute = async (req, res) => {
    try {
        const { token } = req.body;
        const isValid = await checkToken(token);
        if (isValid.error) errorCode(res, isValid.err);
        else successCode(res, isValid.decoded);
    } catch (error) {
        failCode(res);
    }
};

const editUser = async (req, res) => {
    try {
        const { name, email, phone, password, roleId } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (user) {
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                if (err) return failCode(res);
                const userUpdated = await prisma.user.update({
                    data: {
                        name,
                        password: hash,
                        email,
                        phone,
                        roleId,
                    },
                    where: {
                        id: user.id,
                    },
                });
                successCode(res, userUpdated);
            });
        }
    } catch (error) {
        console.log(error);
        failCode(res);
    }
};

const removeUser = async (req, res) => {
    try {
        const { email } = req.body;
        const currentUser = await prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (currentUser) {
            const response = await prisma.user.delete({
                where: {
                    id: currentUser.id,
                },
            });
            if (response) {
                const { name, email, phone, roleId } = response;
                successCode(res, { name, email, phone, roleId });
            }
        } else {
            failCode(res, 'Không có user trong hệ thống. Vui lòng thử lại');
        }
    } catch (error) {
        console.log(error);
        failCode(res);
    }
};

module.exports = {
    getRoleLists,
    getUserLists,
    getUserListsPagination,
    register,
    login,
    checkTokenRoute,
    editUser,
    removeUser,
};
