const User = require("../../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {jwtSecret , jwtExpiresIn} = require("../../config/index");

const loginUser = async (data)=> {
    const {email , password} = data;
    const user = await User.findOne({email}).select("+password");
    if (!email) {
        const err = new Error("Email Not Found!");
        err.statusCode = 404;
        throw err;
    }
    const isMatch = await bcryptjs.compare(password , user.password);
    if (!isMatch) {
        const err = new Error("Invalid Email or Password!");
        err.statusCode = 401;
        throw err;
    }
    const token = jwt.sign(
        {
            id: teacher._id,
            email: email,
        },
        jwtSecret,
        {
            expiresIn: jwtExpiresIn
        }
    );
    return {user , token};
};

module.exports = loginUser;