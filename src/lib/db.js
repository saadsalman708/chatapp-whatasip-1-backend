const mongoose = require("mongoose");
const {mongoUri}  = require("../config/index.js");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("DB Connected!");
  } catch (error) {
    console.error("DB Error: ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;