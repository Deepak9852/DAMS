let mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {SECRET_ACCESS_TOKEN} = require("../config")

const registerUserSchema = new mongoose.Schema(
    {
        first_name :{
            type: String,
            required:"Your firstname is required",
            max:25,
        },

        last_name :{
            type: String,
            required:"Your lastname is required",
            max:25,
        },

        email:{
            type:String,
            required : "your email is required",
            unique: true,
            lowercase:true,
            trim:true,
        },

        password:{
            type:String,
            required: "your password is required",
            select: false,
            max:25,
            min:5,
        },

        role:{
            type:String,
            required: true,     
        },
    },
    {timestamps:true}
);

registerUserSchema.pre("save", function(next){
    const user = this;
    if(!user.isModified("password")) return next();
    bcrypt.genSalt(10, (err, salt) =>{
        if(err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) =>{
            if(err) return next(err);

            user.password = hash;
            next();
        })
    })
})

registerUserSchema.methods.generateAccessJWT = function (){
    let payload = {
        id :this._id,
    };
    return jwt.sign(payload, SECRET_ACCESS_TOKEN,{
        expiresIn: 6000,
    });
};


let registerUserModel = mongoose.model("login_data", registerUserSchema)
module.exports = registerUserModel;
