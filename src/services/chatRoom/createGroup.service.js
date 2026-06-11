const ChatRoom = require("../../models/chatRoom.model");
const createError = require("../../utils/createError");

const createGroup = async (currentUserId, name, participantIds) => {
  if (!name || !participantIds || !Array.isArray(participantIds)) {
    throw createError("Group name and an array of participants are required", 400);
  }

  if (participantIds.length < 2) {
    throw createError("Group chats require at least 2 other members", 400);
  }

  const uniqueMembers = [...new Set([...participantIds, currentUserId.toString()])];

  const group = await ChatRoom.create({
    type: "group",
    name,
    participants: uniqueMembers,
    admins: [currentUserId]
  });

  return await ChatRoom.findById(group._id).populate("participants", "name username isOnline");
};

module.exports = createGroup;