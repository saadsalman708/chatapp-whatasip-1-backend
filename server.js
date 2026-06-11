require("dotenv").config();
const app = require("./src/app.js");
const { backendPort } = require("./src/config/index.js");
const connectDB = require("./src/lib/db.js");
const http = require("http");
const initSockets = require("./src/socket/index.js");

const startServer = async () => {
  try {
    await connectDB();
    
    const server = http.createServer(app);

    initSockets(server);

    app.listen(backendPort, () => {
      console.log(`Server is running on ${backendPort}!`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
