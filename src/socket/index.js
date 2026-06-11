const { Server } = require("socket.io");
const User = require("../models/user.model");
const socketAuth = require("../middleware/auth.socket.middleware");

const joinRoom = require("./events/joinRoom.socket");
const sendMessage = require("./events/sendMessage.socket");
const disconnect = require("./events/disconnect.socket");
const { typing, stopTyping } = require("./events/typing.socket");

const initSockets = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.use(socketAuth);

io.on("connection", async (socket) => {
    const currentUserId = socket.data.userId;

    await User.findByIdAndUpdate(currentUserId, { isOnline: true });
    io.emit("user_status_changed", { userId: currentUserId, isOnline: true });

    socket.join(currentUserId.toString()); 

    socket.on("join_room", joinRoom(io, socket));
    socket.on("send_message", sendMessage(io, socket));
    socket.on("typing", typing(io, socket));
    socket.on("stop_typing", stopTyping(io, socket));
    socket.on("disconnect", disconnect(io, socket));
  });

  return io;
};

module.exports = initSockets;