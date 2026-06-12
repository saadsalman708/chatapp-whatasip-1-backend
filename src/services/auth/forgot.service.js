const crypto = require("crypto");
const User = require("../../models/user.model");
const sendResetEmail = require("../email.service");
const createError = require("../../utils/createError");
const { frontendUrl, frontendPort } = require("../../config");

const forgotPassword = async (email) => {
  if (!email) throw createError("Please provide an email address.", 400);
  const user = await User.findOne({ email });
  if (!user)
    throw createError("No account found with that email address.", 404);

  const rawResetToken = crypto.randomBytes(32).toString("hex");

  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(rawResetToken)
    .digest("hex");

  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: true });

  const resetUrl = `${frontendUrl}/reset-password/${rawResetToken}`;

  try {
    await sendResetEmail(user.email, resetUrl);
    return {
      message: "Reset URL sent to email successfully!",
    };
  } catch (error) {
    console.log("=== RAW NODEMAILER ERROR ===", error);

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw createError(
      "There was an error sending the email. Try again later.",
      500,
    );
  }
};

module.exports = forgotPassword;