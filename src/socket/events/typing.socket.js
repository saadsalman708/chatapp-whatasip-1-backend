const typing = (io, socket) => ({ chatRoomId, username }) => {
  socket.to(chatRoomId).emit("user_typing", { username });
};

const stopTyping = (io, socket) => ({ chatRoomId }) => {
  socket.to(chatRoomId).emit("user_stopped_typing");
};

module.exports = { typing, stopTyping };