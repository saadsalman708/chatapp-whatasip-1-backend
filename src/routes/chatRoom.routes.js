const express = require("express");
const {openPrivate , getSidebarRooms , openGroup} = require("../controllers/chatRoom.controller");
const protect = require("../middleware/protect.middleware");

const chatRoomRouter = express.Router();

chatRoomRouter.use(protect);

chatRoomRouter.post("/private", openPrivate);
chatRoomRouter.get("/sidebar", getSidebarRooms);
chatRoomRouter.post("/group", openGroup);

module.exports = chatRoomRouter;