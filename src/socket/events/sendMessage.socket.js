const createMessage = require("../../services/message/createMessage.service");
const ChatRoom = require("../../models/chatRoom.model");
const Message = require("../../models/message.model");

const sendMessage = (io, socket) => async ({ chatRoomId, senderId, text }) => {

  const savedMessage = await createMessage(senderId, chatRoomId, text);

  const room = await ChatRoom.findById(chatRoomId);
  if (!room) return;

  // Determine which participants are currently online (joined their personal rooms)
  const onlineIds = [];
  room.participants.forEach((memberId) => {
    if (memberId.toString() === senderId.toString()) return;
    // If a socket for this user is currently connected, it will have a room with the user ID
    const sockets = io.sockets.adapter.rooms.get(memberId.toString());
    if (sockets && sockets.size > 0) {
      onlineIds.push(memberId.toString());
    }
  });

  // Update deliveredTo field on the message document
  if (onlineIds.length) {
    await Message.findByIdAndUpdate(savedMessage._id, { $addToSet: { deliveredTo: { $each: onlineIds } } });
    // Refresh the message with updated deliveredTo
    const refreshed = await Message.findById(savedMessage._id);
    savedMessage.deliveredTo = refreshed.deliveredTo;
  }

  // Emit to the room
  io.to(chatRoomId).emit("receive_message", savedMessage);

  room.participants.forEach((memberId) => {
    if (memberId.toString() === senderId.toString()) return;

    io.to(memberId.toString()).emit("background_notification", {
      chatRoomId,
      message: savedMessage,
    });
  });
};

module.exports = sendMessage;