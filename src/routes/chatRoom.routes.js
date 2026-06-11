const express = require("express");
const chatRoomController = require("../controllers/chatRoom.controller");
const protect = require("../middleware/protect.middleware");

const chatRoomRouter = express.Router();

chatRoomRouter.use(protect);
chatRoomRouter.post("/private", chatRoomController.openPrivate);
chatRoomRouter.get("/sidebar", chatRoomController.getSidebarRooms);
chatRoomRouter.post("/group", chatRoomController.openGroup);

module.exports = chatRoomRouter;