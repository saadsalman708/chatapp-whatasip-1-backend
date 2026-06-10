const User = require("../../models/user.model");
const bcryptjs = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const createError = require("../../utils/createError");

const loginUser = async (data)=> {
    const {email , password} = data;
    if (!email || !password) throw createError("All fields are required!", 400);
    
    const user = await User.findOne({email}).select("+password");
    if (!user.email) throw createError("Email Not Found!" , 404);

    const isMatch = await bcryptjs.compare(password , user.password);
    if (!isMatch) throw createError("Invalid Email or Password!" , 401);
    
    const token = generateToken(user._id , email);
    return {user , token};
};

module.exports = loginUser;