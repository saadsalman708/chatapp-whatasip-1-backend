const app = require("./src/app.js");
const { backendPort } = require("./src/config/index.js");
const connectDB = require("./src/lib/db.js");
require("dotenv").config();

const startServer = async () => {
  try {
    await connectDB();

    app.listen(backendPort, () => {
      console.log(`Server is running on ${backendPort}!`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

startServer();