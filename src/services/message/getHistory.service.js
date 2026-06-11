const Message = require("../../models/message.model");

const getHistory = async (chatRoomId) => {
  return await Message.find({ chatRoomId })
    // .populate("sender", "name username avatar")
    .populate("sender", "name username")
    .sort({ createdAt: 1 });
};

module.exports = getHistory;