const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")


const OrderSchema = new mongoose.Schema({
  custId: {
    type: String,
    required: [true, "Customer ID is mandatory"],
  },

  orderDate: {
    type: String,
    required: [true, "Order Date is mandatory"],
  },

  orderDetail: {
    type: Array,
    required: [true, "Please add the Food category"],
  }
})



var foodMenu = mongoose.model('Order_Model', OrderSchema);
module.exports = foodMenu;