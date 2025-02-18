const jwt = require('jsonwebtoken');
const registerUserModel = require('../model/registerUser');
const blackListModel = require('../model/blackList');
const {SECRET_ACCESS_TOKEN} = require('../config')



async function Verify(req, res, next){
    try {
        const authHeader = req.headers["cookie"];
        if(!authHeader) return res.sendStatus(401);
        const cookie = authHeader.split("=")[1];
        const accessToken = cookie.split(";")[0];
        console.log(accessToken);
        const checkIfBlackListed = await blackListModel.findOne({token:accessToken});
        if(checkIfBlackListed)
            return res.status(401).json({message: "This session has expired . Please log In"});
        jwt.verify(cookie, SECRET_ACCESS_TOKEN, async(err, decoded) =>{
            if(err){
                return res.status(401).json({message: "This session has expired. Please login"})
            }
            const {id} = decoded;        
            const user = await registerUserModel.findById(id);
            const {password, ...data} = user._doc;
            req.user = data;
            next();
        });
    } catch (err) {
        res.status(500).json({
            status:"error",
            code:500,
            data: [],
            message : "Internal server Error",
        });
    };
};

function VerifyRole(req, res, next){
    try {
        const user = req.user;
        const {role} = user;
        if(role !== "admin"){
            return res.status(401).json({
                status: "failed",
                message: "You are not authorized to view this page."
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error "
        })
    }
}



module.exports = {Verify, VerifyRole};