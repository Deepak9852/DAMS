let express = require('express');
const {Verify, VerifyRole} = require('../middleware/verify');
const { enquiryList } = require('../controller/authController');
let userRoutes = express.Router();
// let cors = require('cors');

// userRoutes.use(cors());

userRoutes.get("/counsellor", Verify, VerifyRole,  enquiryList);

module.exports = userRoutes;