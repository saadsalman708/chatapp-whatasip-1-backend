const express = require("express");
const loadChatMessages = require("../controllers/message.controller");
const protect = require("../middleware/protect.middleware");

const messageRouter = express.Router();

messageRouter.get("/:chatRoomId", protect, loadChatMessages);

module.exports = messageRouter;