const config = {
    backendPort: process.env.BACKEND_PORT,
    emailHost: process.env.EMAIL_HOST,
    emailPass: process.env.EMAIL_PASS,
    emailPort: process.env.EMAIL_PORT,
    emailUser: process.env.EMAIL_USER,
    frontendPort: process.env.FRONTEND_PORT,
    frontendUrl: process.env.FRONTEND_URL,
    mongoUri: process.env.MONGO_URI,
    nodeEnv: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};

module.exports = config;