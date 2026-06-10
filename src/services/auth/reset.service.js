const crypto = require("crypto");
const bcryptjs = require("bcryptjs");
const User = require("../../models/user.model");
const generateToken = require("../../utils/generateToken");
const createError = require("../../utils/createError");

const resetPassword = async (rawToken, newPassword) => {
  if (!newPassword) throw createError("Please provide a new password.", 400);

  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  
  if (!user) throw createError("Token is invalid or has expired.", 400);
  
  const isSame = await bcryptjs.compare(newPassword , user.password);
  if (isSame) throw createError("New password cannot be the same as your old password!" , 400)

  const salt = await bcryptjs.genSalt(10);
  user.password = await bcryptjs.hash(newPassword, salt);

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save({ validateBeforeSave: true });

  const newToken = generateToken(user._id, user.email);

  user.password = undefined;

  return { user, newToken };
};

module.exports = resetPassword;