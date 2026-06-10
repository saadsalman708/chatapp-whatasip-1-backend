const User = require("../../models/user.model");

const registerUser = async (data) => {
  const { name, username, email, password } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const err = new Error("Email already exists!");
    err.statusCode = 400;
    throw err;
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPass = await bcryptjs.hash(password, salt);

  const newUser = await User.create({
    name: name,
    username: username,
    email: email,
    password: hashedPass,
  });
  return newUser;
};

module.exports = registerUser;