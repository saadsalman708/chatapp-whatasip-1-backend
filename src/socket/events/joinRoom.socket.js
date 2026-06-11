const markRead = require("../../services/message/markRead.service");

const joinRoom = (io, socket) => async ({ chatRoomId, userId }) => {
  socket.join(chatRoomId);
  
  await markRead(chatRoomId, userId);
  
  socket.to(chatRoomId).emit("messages_marked_read", { chatRoomId, readBy: userId });
};

module.exports = joinRoom;