const ChatRoom = require("../../models/chatRoom.model");
const User = require("../../models/user.model");
const createError = require("../../utils/createError");

const getPrivateChat = async (currentUserId, targetUserId) => {
  if (!targetUserId) throw createError("Recipient ID is required", 400);
  
  if (currentUserId.toString() === targetUserId.toString()) {
    throw createError("You cannot start a chat with yourself", 400);
  }

  const targetUser = await User.findById(targetUserId);
  if (!targetUser) throw createError("User not found", 404);

  let chat = await ChatRoom.findOne({
    type: "private",
    participants: { $all: [currentUserId, targetUserId] }
  }).populate("participants", "name username email isOnline lastSeen")
    .populate("lastMessage");

  if (chat) return chat;

  const newChat = await ChatRoom.create({
    type: "private",
    participants: [currentUserId, targetUserId]
  });

  return await ChatRoom.findById(newChat._id).populate("participants", "name username email");
};

module.exports = getPrivateChat;