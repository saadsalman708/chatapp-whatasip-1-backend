const Message = require("../../models/message.model");

const markDelivered = async (chatRoomId, userId) => {
  return await Message.updateMany(
    {
      chatRoomId,
      sender: { $ne: userId },
      deliveredTo: { $ne: userId },
    },
    {
      $addToSet: { deliveredTo: userId },
    }
  );
};

module.exports = markDelivered;