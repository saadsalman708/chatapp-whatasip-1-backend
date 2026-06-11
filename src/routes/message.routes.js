const express = require("express");
const messageController = require("../controllers/message.controller");
const protect = require("../middleware/protect.middleware");

const messageRouter = express.Router();

messageRouter.use(protect);

messageRouter.get("/:chatRoomId", messageController.loadChatMessages);

module.exports = messageRouter;