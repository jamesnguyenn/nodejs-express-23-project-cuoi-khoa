const { axios } = require('axios');
const { failCode } = require('../ulti/response');

const uploadFile = async (file) => {
    try {
        const response = await axios.post(
            '/https://tmpfiles.org/api/v1/upload'
        );
        res.send(response);
    } catch (error) {
        console.log(error);
        failCode(res);
    }
};

module.exports = { uploadFile };
