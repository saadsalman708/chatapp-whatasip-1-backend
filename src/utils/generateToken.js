const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config");

const generateToken = (userId, email) => {
  return jwt.sign(
    {
      id: userId,
      email,
    },
    jwtSecret,
    {
      expiresIn: jwtExpiresIn,
    },
  );
};

module.exports = generateToken;