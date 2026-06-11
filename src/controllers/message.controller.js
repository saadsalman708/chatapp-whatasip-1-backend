const getHistory = require("../services/message/getHistory.service");
const markRead = require("../services/message/markRead.service");
const catchAsync = require("../utils/catchAsync");

const loadChatMessages = catchAsync(async (req, res) => {
  const { chatRoomId } = req.params;
  const currentUserId = req.user._id;

  await markRead(chatRoomId, currentUserId);

  const messages = await getHistory(chatRoomId);

  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages,
  });
});

module.exports = loadChatMessages;