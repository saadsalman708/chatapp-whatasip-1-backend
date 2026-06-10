const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config/index");

const verifyToken = (token) => {
    try {
        return jwt.verify(token , jwtSecret);
    } catch (error) {
        return null;
    }
};

module.exports = verifyToken;