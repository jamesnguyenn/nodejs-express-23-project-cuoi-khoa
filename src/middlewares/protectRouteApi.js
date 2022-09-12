const {checkToken} =require('../ulti/auth.js');
const {successCode,errorCode, failCode } = require('../ulti/response');
const jwt = require("jsonwebtoken")

const protectedRouteApi = async(req,res,next) =>{
    try {
        const token =req.headers.authorization;
        if(!token) {res.status(403).json({error:true, message:"Token không hợp lệ. Vui lòng đăng nhập lại."})}
        else { 
            const isValid = await checkToken(token)
            if(isValid.error) {
                console.log(isValid)
                if(isValid.expiredAt){
                    res.status(401).json({error:true,message:"Token hết hạn"})
                }else{
                    res.status(401).json({error:true,message:"Token không hợp lệ."})
                }
            }else{
                next()
            }
        }
    } catch (error) {
        failCode(res)
    }
}

module.exports = protectedRouteApi