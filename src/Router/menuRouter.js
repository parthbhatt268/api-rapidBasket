const express = require("express")
const {addFoodItem, getFoodItemsbyCategory} = require("../Controller/menu.controller")

const menuRouter = express.Router()


menuRouter.post("/add-food-item", addFoodItem);
menuRouter.get("/getfooditems", getFoodItemsbyCategory)


module.exports = menuRouter