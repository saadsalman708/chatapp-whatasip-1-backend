const Message = require("../../models/message.model");

const getMessages = async (currentUserId, chatRoomId) => {
  await Message.updateMany(
    { chatRoomId, sender: { $ne: currentUserId }, readBy: { $ne: currentUserId } },
    { $addToSet: { readBy: currentUserId } }
  );

  return await Message.find({ chatRoomId })
    .populate("sender", "name username")
    .sort({ createdAt: 1 });
};

module.exports = getMessages;