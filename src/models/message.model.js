const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
    chatRoomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatRoom",
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    // msgType: {
    //     type: String,
    //     enum: ["text" , "image" , "video" , "file"],
    //     default: "text",
    // },
    // mediaUrl: {
    //     type: String,
    //     default: "",
    // },
    readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    isRead: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

msgSchema.index({ chatRoomId: 1, createdAt: -1 });

module.exports = mongoose.model("Message" , msgSchema);