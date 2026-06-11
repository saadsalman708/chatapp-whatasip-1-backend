const { Server } = require("socket.io");
const socketAuth = require("../middleware/auth.socket.middleware");
const { frontendUrl } = require("../config/index");

const joinRoom = require("./events/joinRoom.socket");
const sendMessage = require("./events/sendMessage.socket");
const disconnect = require("./events/disconnect.socket");
const { typing, stopTyping } = require("./events/typing.socket");

const initSockets = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: frontendUrl,
      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    socket.on("join_room", joinRoom(io, socket));
    socket.on("send_message", sendMessage(io, socket));
    socket.on("typing", typing(io, socket));
    socket.on("stop_typing", stopTyping(io, socket));
    socket.on("disconnect", disconnect(io, socket));
  });

  return io;
};

module.exports = initSockets;