const config = {
    backendPort: process.env.BACKEND_PORT,
    frontendPort: process.env.FRONTEND_PORT,
    frontendUrl: process.env.FRONTEND_URL,
    mongoUri: process.env.MONGO_URI,
    nodeEnv: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};

module.exports = config;