const express = require("express")
const {Register, login, postProfile, getProfile} = require("../Controller/user.controller")

const userRouter = express.Router()


userRouter.post("/signup", Register);
userRouter.post("/login", login)
userRouter.post("/postProfile", postProfile)
userRouter.get("/getProfile", getProfile)


console.log("Reached routes")



module.exports = userRouter