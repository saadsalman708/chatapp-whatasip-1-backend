const Messages = require("../models/message.model");

const markMsgsAsDelivered = async (chatRoomId, userId) => {
  return await Messages.updateMany(
    {
      chatRoomId: { $in: chatRoomId },
      sender: { $ne: userId },
      deliveredTo: { $ne: userId },
    },
    {
      $addToSet: { deliveredTo: userId },
    },
  );
};

const markMsgsAsRead = async (chatRoomId, userId) => {
  return await Messages.updateMany(
    {
      chatRoomId: chatRoomId,
      sender: { $ne: userId },
      readBy: { $ne: userId },
    },
    {
      $addToSet: { readBy: userId },
    },
  );
};

const getMsgsHistory = async (chatRoomId) => {
  return await Messages.find({ chatRoomId }).sort({ createdAt: 1 });
};

module.exports = {
  markMsgsAsDelivered,
  markMsgsAsRead,
  getMsgsHistory,
};