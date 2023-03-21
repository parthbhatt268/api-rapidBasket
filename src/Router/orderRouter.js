const express = require("express")
const {postOrder} = require("../Controller/order.controller")

const orderRouter = express.Router()


orderRouter.post("/postOrder", postOrder);


module.exports = orderRouter