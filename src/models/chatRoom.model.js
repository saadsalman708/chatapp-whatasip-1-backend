const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["private", "group"],
        required: true
    },
    name: {
        type: String,
        trim: true,
        default: ""
    },
    participants: [{
        type: String,
        required: true
    }],
    admins: [{
        type: String
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages"
    }
}, { timestamps: true });

chatRoomSchema.index({ participants: 1 });

module.exports = mongoose.model("chatRooms", chatRoomSchema);
