const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")


const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Food item should have name"],
  },

  category: {
    type: String,
    required: [true, "Please add the Food category"],
  },
  price: {
    type: Number,
    required: [true, "Please add the item price"],
  },
  photo: {
    type: String
  },
  description: {
    type: String
  }
})



var foodMenu = mongoose.model('Food_Menu', MenuSchema);
module.exports = foodMenu;