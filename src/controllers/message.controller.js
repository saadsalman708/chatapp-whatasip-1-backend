const { createConnection } = require("mongoose");
const Messages = require("../models/message.model");
const {
  markMsgsAsDelivered,
  markMsgsAsRead,
  getMsgsHistory,
} = require("../services/message.service");

const getMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const userId = req.query.userId;

    const allMsgs = getMsgsHistory(chatRoomId);

    res.status(200).json({
      message: "ok",
      allMsgs,
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed to load messages. Error: ${error.message}`,
    });
  }
};

module.exports = {getMessages  };