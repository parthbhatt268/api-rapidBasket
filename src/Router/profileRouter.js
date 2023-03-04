const express = require("express")
const {Register, login, postProfile, getProfile} = require("../Controller/user.controller")
const {authControllerProtected} = require('../Middleware/Authenticate')

const profileRouter = express.Router()

profileRouter.post("/postProfile", postProfile);
profileRouter.get("/getProfile", getProfile);


console.log("Reached routes")

module.exports = profileRouter