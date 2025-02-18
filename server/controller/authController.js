const blackListModel = require("../model/blackList");
const registerUserModel = require("../model/registerUser");
const bcrypt = require("bcrypt");

async function UserRegister(req, res) {
  const { first_name, last_name, email, password, role } = req.body;
  try {
    const newUser = new registerUserModel({
      first_name,
      last_name,
      email,
      password,
      role,
    });

    const existingUser = await registerUserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        status: "failed",
        data: [],
        message: "It seems you already have an account, please logIn instead",
      });
    const savedUser = await newUser.save();
    const { ...user_data } = savedUser._doc;
    res.status(200).json({
      status: "success",
      data: [user_data],
      message:
        "Thank you for registring with us. your account has been successfully created.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal sever error",
    });
  }
  res.end();
}

async function UserLogin(req, res) {
  const {email} = req.body;
  try {
    const user = await registerUserModel.findOne({email}).select("+password");
    if (!user)
      return res.status(401).json({
        status: "failed",
        data: [],
        message:
          "invailid email or password. Please try again with correct credential",
      });

    // if user exist
    // validate password

    const isPasswordValid = await bcrypt.compare(
      `${req.body.password}`,
      user.password
    );

    if (!isPasswordValid)
      return res.status(401).json({
        status: "failed",
        data: [],
        message:
          "invalid email or password. Please try again with the correct credential",
      });


      let options = {
        maxAge: 20*60*1000,
        httpOnly: true,
        secure:true,
        samesite : "None"
      }


    

    const { password, ...user_data } = user._doc;
    const accessToken = user.generateAccessJWT();
    res.cookie("SessionID", accessToken, options);
    // localStorage.setItem('token', accessToken);
    res.status(200).json({
      status: "success",
      accessToken,
      data: [user_data],
      message: "You have successFully logged in",
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal login server Error",
    });
  };
  res.end();
};

async function UserLogout(req, res) {
  try {
    const authHeader = req.headers['cookie'];
    if(!authHeader) return res.sendStatus(204);
    const cookie = authHeader.split('=')[1];
    const accessToken = cookie.split(';')[0];
    const checkIfBlackListed = await blackListModel.findOne({token: accessToken});
    if(checkIfBlackListed) return res.sendStatus(204);

    const newBlackList = new blackListModel({
      token: accessToken,
    });
    await newBlackList.save();
    res.setHeader('Clear-site-Data', '"cookies"');
    res.status(200).json({message: 'You are logged out!'});
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error '
    });
  }
  res.end();
}

let enquiryList = async (req, res) => {
  let enquiryData = await registerUserModel.find();
  res.status(200).json({ msg: "data get", data: enquiryData });
};

module.exports = { UserRegister, UserLogin, UserLogout,enquiryList };
