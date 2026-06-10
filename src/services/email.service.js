const nodemailer = require("nodemailer");
const {
  emailHost,
  emailPort,
  emailUser,
  emailPass,
  frontendUrl,
} = require("../config/index");

const sendResetEmail = async (email, resetUrl) => {
  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const mailOption = {
    from: `Whatasip <no-reply@${frontendUrl}>`,
    to: email,
    subject: "Password Reset Request (Valid for 10 Mins)",
    text: `Forgot your password? Click this link to reset it: ${resetUrl}\n\nIf you did not make this request, please ignore this email.`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; background-color: #f4f4f5; border-radius: 12px;">
        <h2 style="color: #3b82f6;">Password Reset Request</h2>
        <p style="color: #4b5563;">We received a request to reset your password. Click the button below to secure your account:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 15px 0;">Reset My Password</a>
        <p style="color: #9ca3af; font-size: 12px;">This link will expire in 10 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOption);
};

module.exports = sendResetEmail;