const config = {
    mongoUri: process.env.MONGO_URI,
    frontendPort: process.env.FRONTEND_PORT,
    backendPort: process.env.BACKEND_PORT,
    frontendUrl: process.env.FRONTEND_URL,
    nodeEnv: process.env.NODE_ENV,
};

module.exports = config;