const registerUser = require("../services/auth/register.service");
const loginUser = require("../services/auth/login.service");
const catchAsync = require("../utils/catchAsync");
const {nodeEnv} = require("../config/index")

const signup = catchAsync( async (req , res) => {
    const user = await registerUser(req.body);
    res.status(201).json({
        message: "User Created successfully!",
        user,
    });
});

const login = catchAsync( async (req , res) => {
    const {user , token} = await loginUser(req.body);
    res.cookie("token" , token , {
    httpOnly: true,
    secure: nodeEnv === "production",
    sameSite: "strict",
    // sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        message: "Logged in successfull!",
        user,
    });
});

module.exports = {
    signup,
    login,
};