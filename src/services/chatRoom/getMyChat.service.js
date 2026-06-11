const ChatRoom = require("../../models/chatRoom.model");

const getMyChats = async (userId) => {
  return await ChatRoom.find({ participants: userId })
    .populate("participants", "name username isOnline lastSeen")
    .populate({
      path: "lastMessage",
      populate: { path: "sender", select: "name username" }
    })
    .sort({ updatedAt: -1 });
};

module.exports = getMyChats;