const express = require("express");
const findFriends = require("../controllers/user.controller");
const protect = require("../middleware/protect.middleware");

const messageRouter = express.Router();

messageRouter.use(protect);

messageRouter.get("/:chatRoomId", findFriends);

module.exports = messageRouter;