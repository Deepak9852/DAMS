let express = require('express');
const {UserRegister, UserLogin, UserLogout} = require('../controller/authController');
let Validate = require('../middleware/validate')
let {check} = require('express-validator');


const router = express.Router();

router.post("/register",
     check("email").isEmail().withMessage("Enter a valid email address").normalizeEmail(),
     check("first_name").not().isEmpty().withMessage("Your first name is required").trim().escape(),
     check("last_name").not().isEmpty().withMessage("Your last name is required").trim().escape(),
     check("password").notEmpty().isLength({min:5}).withMessage("must be atleast 5 chars long"),
     check("role").not().isEmpty().withMessage("Your role is required").trim().escape(),
     Validate,
     UserRegister
    );


router.post("/login",
     check("email").isEmail().withMessage("Enter a valid email address").normalizeEmail(),
     check("password").notEmpty().isLength({min:5}).withMessage("Must be at least 8 char long"),
     Validate,
     UserLogin
);

router.get('/logout', UserLogout);



module.exports = router;