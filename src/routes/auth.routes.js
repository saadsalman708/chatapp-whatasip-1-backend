const express = require("express");
const {
  signup,
  login,
  forgot,
  reset,
  signOut,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", signup);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgot);
authRouter.patch("/reset-password/:urlToken", reset);
authRouter.post("/logout", signOut);

module.exports = authRouter;