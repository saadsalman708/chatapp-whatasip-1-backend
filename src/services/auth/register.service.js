const User = require("../../models/user.model");
const bcryptjs = require("bcryptjs");
const createError = require("../../utils/createError");
const generateToken = require("../../utils/generateToken");

const registerUser = async (data) => {
  const { name, username, email, password } = data;
  if (!name || !username || !email || !password) throw createError("All fields are required!", 400);

  const existingUser = await User.findOne({ email });
  if (existingUser) throw createError("Email already exists!" , 400);

  const salt = await bcryptjs.genSalt(10);
  const hashedPass = await bcryptjs.hash(password, salt);

  const newUser = await User.create({
    name: name,
    username: username,
    email: email,
    password: hashedPass,
  });

  const token = generateToken(newUser._id , email);

  newUser.password = undefined;

  return {
    user: newUser,
    token
  };
};

module.exports = registerUser;