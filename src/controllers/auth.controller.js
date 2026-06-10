const registerUser = require("../services/auth/register.service");
const loginUser = require("../services/auth/login.service");
const catchAsync = require("../utils/catchAsync");
const { nodeEnv } = require("../config/index");

const setCookie = (res , token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: nodeEnv === "production",
    sameSite: "strict",
    // sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

const signup = catchAsync(async (req, res) => {
  const {user , token} = await registerUser(req.body);
  
  setCookie(res , token);

  res.status(201).json({
    message: "User Created successfully!",
    token,
    user,
  });
});

const login = catchAsync(async (req, res) => {
  const { user, token } = await loginUser(req.body);

  setCookie(res , token);

  res.status(200).json({
    message: "Logged in successfull!",
    token,
    user,
  });
});

module.exports = {
  signup,
  login,
};