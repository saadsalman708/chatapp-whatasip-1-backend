const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rooms",
        required: true,
    },
    sender: {
        type: String,
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
        type: String,
    }],
    isRead: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

msgSchema.index({ roomId: 1, createdAt: -1 });

module.exports = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model("Messages" , msgSchema);