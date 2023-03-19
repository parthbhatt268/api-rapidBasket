const express = require("express")
const {postProfile, getProfile} = require("../Controller/user.controller")

const profileRouter = express.Router()

profileRouter.post("/postProfile", postProfile);
profileRouter.get("/getProfile", getProfile);


module.exports = profileRouter