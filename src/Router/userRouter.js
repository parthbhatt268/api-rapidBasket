const express = require("express")
const app  = require("../../app")
const {Register} = require("../Middleware/Authenticate")

const userRouter = express.Router()


userRouter.post("/signup", Register);


module.exports = userRouter