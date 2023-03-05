const express = require("express")
const {Register, login, postProfile, getProfile} = require("../Controller/user.controller")
const {authControllerProtected} = require('../Middleware/Authenticate')

const userRouter = express.Router()

userRouter.post("/signup", Register,);
userRouter.post("/login", login);



console.log("Reached routes")



module.exports = userRouter