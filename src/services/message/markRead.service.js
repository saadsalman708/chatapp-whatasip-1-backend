const Message = require("../../models/message.model");

const markRead = async (chatRoomId, userId) => {
  return await Message.updateMany(
    {
      chatRoomId,
      sender: { $ne: userId },
      readBy: { $ne: userId },
    },
    {
      $addToSet: { readBy: userId },
      $set: { isRead: true },
    }
  );
};

module.exports = markRead;