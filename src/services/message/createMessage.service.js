const Message = require("../../models/message.model");
const ChatRoom = require("../../models/chatRoom.model");
const createError = require("../../utils/createError");

const createMessage = async (currentUserId, chatRoomId, text) => {
  if (!chatRoomId || !text) throw createError("Chat room ID and message text are required", 400);

  const room = await ChatRoom.findById(chatRoomId);
  if (!room) throw createError("Chat room does not exist", 404);

  let message = await Message.create({
    chatRoomId,
    sender: currentUserId,
    text,
    readBy: [currentUserId]
  });

  room.lastMessage = message._id;
  await room.save();

  return await message.populate("sender", "name username");
};

module.exports = createMessage;