const createMessage = require("../../services/message/createMessage.service");

const sendMessage = (io, socket) => async ({ chatRoomId, senderId, text }) => {
  const savedMessage = await createMessage(senderId, chatRoomId, text);

  io.to(chatRoomId).emit("receive_message", savedMessage);
  io.emit("sidebar_update");
};

module.exports = sendMessage;