const jwt = require('jsonwebtoken');
const registerUserModel = require('../model/registerUser');
const blackListModel = require('../model/blackList');
const {SECRET_ACCESS_TOKEN} = require('../config')



async function Verify(req, res, next){
    try {
        // Check for Authorization header first
        const authHeader = req.headers["authorization"];
        let token;
        
        if (authHeader && authHeader.startsWith('Bearer ')) {
            // Extract token from Authorization header
            token = authHeader.split(' ')[1];
        } else {
            // Fall back to cookie if no Authorization header
            const cookieHeader = req.headers["cookie"];
            if (!cookieHeader) return res.sendStatus(401);
            const cookie = cookieHeader.split("=")[1];
            token = cookie.split(";")[0];
        }

        if (!token) return res.sendStatus(401);

        const checkIfBlackListed = await blackListModel.findOne({token:token});
        if(checkIfBlackListed)
            return res.status(401).json({message: "This session has expired . Please log In"});
        jwt.verify(token, SECRET_ACCESS_TOKEN, async(err, decoded) =>{
            if(err){
                return res.status(401).json({message: "This session has expired. Please login"})
            }
            const {id} = decoded;        
            const user = await registerUserModel.findById(id);
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
            const {password, ...data} = user._doc;
            req.user = data;
            next();
        });
    } catch (err) {
        console.error('Verify middleware error:', err);
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