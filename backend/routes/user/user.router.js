const express = require("express");
const { signinUser, signupUser } = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/register", signupUser);
userRouter.post("/login", signinUser);

module.exports = userRouter;
