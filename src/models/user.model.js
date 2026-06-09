const mongooes = require("mongoose");

const userSchema = new mongooes.Schema({
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    }
}, {timestamps: true});

module.exports = mongooes.model("Users" , userSchema);