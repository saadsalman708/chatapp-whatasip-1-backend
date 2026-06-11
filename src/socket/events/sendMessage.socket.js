const createMessage = require("../../services/message/createMessage.service");
const ChatRoom = require("../../models/chatRoom.model");

const sendMessage = (io, socket) => async ({ chatRoomId, senderId, text }) => {

  const savedMessage = await createMessage(senderId, chatRoomId, text);

  io.to(chatRoomId).emit("receive_message", savedMessage);
  
  const room = await ChatRoom.findById(chatRoomId);
  if (!room) return;

  room.members.forEach((memberId) => {
    if (memberId.toString() === senderId.toString()) return;

    io.to(memberId.toString()).emit("background_notification", {
      chatRoomId,
      message: savedMessage,
    });
  });
};

module.exports = sendMessage;