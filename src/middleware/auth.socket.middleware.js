const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/index");

const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) return next(new Error("Authentication error: Token missing."));

    const decoded = jwt.verify(token, jwtSecret);
    socket.data.userId = decoded.id; 
    next();
  } catch (err) {
    next(new Error("Authentication error: Invalid session."));
  }
};

module.exports = socketAuth;