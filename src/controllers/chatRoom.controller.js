const getPrivateChat = require("../services/chatRoom/getPrivateChat.service");
const getMyChats = require("../services/chatRoom/getMyChat.service");
const createGroup = require("../services/chatRoom/createGroup.service");
const catchAsync = require("../utils/catchAsync");

const openPrivate = catchAsync(async (req, res) => {
  console.log(req.user._id , req.body.targetUserId)
  const chat = await getPrivateChat(req.user._id, req.body.targetUserId);
  res.status(200).json({ success: true, data: chat });
});

const getSidebarRooms = catchAsync(async (req, res) => {
  const chats = await getMyChats(req.user._id);
  res.status(200).json({ success: true, data: chats });
});

const openGroup = catchAsync(async (req, res) => {
  const chat = await createGroup(req.user._id, req.body.name, req.body.participants);
  res.status(201).json({ success: true, data: chat });
});

module.exports = { openPrivate, getSidebarRooms, openGroup };