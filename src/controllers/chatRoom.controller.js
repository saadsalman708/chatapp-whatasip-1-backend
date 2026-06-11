const getPrivateChat = require("../services/chatRoom/getPrivateChat");
const getMyChats = require("../services/chatRoom/getMyChats");
const createGroup = require("../services/chatRoom/createGroup");
const catchAsync = require("../utils/catchAsync");

const openPrivate = catchAsync(async (req, res) => {
  const chat = await getPrivateChat(req.user._id, req.body.userId);
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