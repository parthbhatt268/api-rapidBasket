const express = require("express")
const {Register, login} = require("../Controller/user.controller")

const userRouter = express.Router()

userRouter.post("/signup", Register,);
userRouter.post("/login", login);

module.exports = userRouter