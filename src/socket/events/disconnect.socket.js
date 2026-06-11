const User = require("../../models/user.model");

const disconnect = (io, socket) => async () => {
  const userId = socket.data.userId;
  if (!userId) return;

  await User.findByIdAndUpdate(userId, {
    isOnline: false,
    lastSeen: new Date(),
  });

  io.emit("user_status_changed", { userId, isOnline: false });
};

module.exports = disconnect;