const registerUser = require("../services/auth/register.service");
const loginUser = require("../services/auth/login.service");
const forgotPassword = require("../services/auth/forgot.service");
const resetPassword = require("../services/auth/reset.service");
const catchAsync = require("../utils/catchAsync");
const { nodeEnv } = require("../config/index");

const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: nodeEnv === "production",
    sameSite: "strict",
    // sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

const signup = catchAsync(async (req, res) => {
  const { user, token } = await registerUser(req.body);

  setCookie(res, token);

  res.status(201).json({
    message: "User Created successfully!",
    token,
    user,
  });
});

const login = catchAsync(async (req, res) => {
  const { user, token } = await loginUser(req.body);

  setCookie(res, token);

  res.status(200).json({
    message: "Logged in successfull!",
    token,
    user,
  });
});

const forgot = catchAsync(async (req, res) => {
  const result = await forgotPassword(req.body.email);
  res.status(200).json({
    success: true,
    message: result.message,
  });
});

const reset = catchAsync(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const { user , token } = await resetPassword(token, password);

  setCookie(res , token);

  res.status(200).json({
    success: true,
    message: "Password reset successfully! You are now logged in",
    user,
    token,
  });
});

const signOut = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: nodeEnv === "production",
    sameSite: "strict",
    // sameSite: "none",
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully!",
  });
};

module.exports = {
  signup,
  login,
  forgot,
  reset,
  signOut,
};