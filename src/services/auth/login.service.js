const User = require("../../models/user.model");
const bcryptjs = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const createError = require("../../utils/createError");

const loginUser = async (data)=> {
    const {email , password} = data;
    if (!email || !password) throw createError("All fields are required!", 400);
    
    // email can be either email or username
    const user = await User.findOne({
        $or: [{ email: email }, { username: email }]
    }).select("+password");
    
    if (!user) throw createError("User Not Found!" , 404);

    const isMatch = await bcryptjs.compare(password , user.password);
    if (!isMatch) throw createError("Invalid Email or Password!" , 401);
    
    const token = generateToken(user._id , user.email);

    user.password = undefined;

    return {user , token};
};

module.exports = loginUser;