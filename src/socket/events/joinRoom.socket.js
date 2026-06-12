const markRead = require("../../services/message/markRead.service");
const Message = require("../../models/message.model");

const joinRoom = (io, socket) => async ({ chatRoomId, userId }) => {
  socket.join(chatRoomId);

  // Mark any undelivered messages in this room as delivered to this user
  // This handles the case where the sender was online but the receiver was offline
  const undelivered = await Message.find({
    chatRoomId,
    sender: { $ne: userId },
    deliveredTo: { $ne: userId },
  }).select("_id sender");

  if (undelivered.length) {
    await Message.updateMany(
      { _id: { $in: undelivered.map((m) => m._id) } },
      { $addToSet: { deliveredTo: userId } }
    );
    // Notify each message's sender so their tick upgrades single-grey -> double-grey
    undelivered.forEach((msg) => {
      io.to(msg.sender.toString()).emit("message_delivered", {
        messageId: msg._id,
        deliveredTo: [userId],
      });
    });
  }

  // Mark all messages in this room as read and notify senders -> double-blue tick
  await markRead(chatRoomId, userId);
  socket.to(chatRoomId).emit("messages_marked_read", { chatRoomId, readBy: userId });
};

module.exports = joinRoom;