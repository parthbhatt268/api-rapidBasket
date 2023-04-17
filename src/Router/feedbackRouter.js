const express = require("express")
const { feedbackController} = require("../Controller/feedback.controller")

const feedbackRouter = express.Router()

feedbackRouter.post("/post-feedback", feedbackController);


module.exports = feedbackRouter