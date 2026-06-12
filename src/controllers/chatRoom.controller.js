const getPrivateChat = require("../services/chatRoom/getPrivateChat.service");
const getMyChats = require("../services/chatRoom/getMyChat.service");
const createGroup = require("../services/chatRoom/createGroup.service");
const catchAsync = require("../utils/catchAsync");

const openPrivate = catchAsync(async (req, res) => {
  const chat = await getPrivateChat(req.user._id, req.body.targetUserId);
  
  const io = req.app.get("io");
  if (io) {
    chat.participants.forEach((p) => {
      io.to(p._id ? p._id.toString() : p.toString()).emit("new_chat_room", chat);
    });
  }

  res.status(200).json({ success: true, data: chat });
});

const getSidebarRooms = catchAsync(async (req, res) => {
  const chats = await getMyChats(req.user._id);
  res.status(200).json({ success: true, data: chats });
});

const openGroup = catchAsync(async (req, res) => {
  const chat = await createGroup(req.user._id, req.body.name, req.body.participants);
  
  const io = req.app.get("io");
  if (io) {
    chat.participants.forEach((p) => {
      io.to(p._id ? p._id.toString() : p.toString()).emit("new_chat_room", chat);
    });
  }

  res.status(201).json({ success: true, data: chat });
});

module.exports = { openPrivate, getSidebarRooms, openGroup };