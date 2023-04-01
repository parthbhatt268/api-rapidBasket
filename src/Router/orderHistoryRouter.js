const express = require("express")
const {getOrderHistoryOfCustomer} = require("../Controller/order.controller")

const orderHistoryRouter = express.Router()


orderHistoryRouter.get("/getOrderHistory", getOrderHistoryOfCustomer)
module.exports = orderHistoryRouter

