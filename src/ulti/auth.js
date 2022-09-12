const jwt = require('jsonwebtoken');
const { failCode, errorCode, successCode } = require('./response');
require('dotenv').config();

const checkToken = async (token) => {
    const response = await jwt.verify(
        token,
        process.env.SECRET_KEY_JWT,
        function (err, decoded) {
            if (err) {
                return { error: true, err };
            } else {
                return { error: false, decoded };
            }
        }
    );
    return response;
};

module.exports = { checkToken };
