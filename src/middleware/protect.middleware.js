const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const createError = require("../utils/createError");
const extractToken = require("../utils/extractToken");
const verifyToken = require("../utils/verifyToken");

const protect = catchAsync(async (req , res , next) => {
    const token = extractToken(req);
    if (!token) {
        throw createError("Authentication required. Please log in." , 401);
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        throw createError("The user owning this token no longer exists." , 401);
    }
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        throw createError("The user owning this token no longer exists." , 401);
    }
    req.user = currentUser;
    next();
});

module.exports = protect;