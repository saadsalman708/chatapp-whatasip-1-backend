const express = require("express");
const findFriends = require("../controllers/user.controller");
const protect = require("../middleware/protect.middleware");

const userRouter = express.Router();

userRouter.get("/search", protect, findFriends);

module.exports = userRouter;