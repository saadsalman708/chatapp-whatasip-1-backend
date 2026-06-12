const { googleLoginService } = require("../services/auth/googleLogin.service");
const catchAsync = require("../utils/catchAsync");
const { setCookie } = require("../utils/cookieHelper");

const googleLogin = catchAsync(async (req, res) => {
  const { idToken } = req.body;
  const { user, token } = await googleLoginService(idToken);
  setCookie(res, token);
  res.status(200).json({
    message: "Google login successful",
    token,
    user,
  });
});

module.exports = { googleLogin };
