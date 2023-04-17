const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")


const feedbackSchema = new mongoose.Schema({
  custId: {
    type: String,
    required: [true, "Customer ID is mandatory"],
  },

  emailId: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid Email"],  },

  Message: {
    type: Array,
    required: [true, "Please add the Feedback Message"],
  },
  createdAt :  { 
    type : Date, 
    timestamps: true 
}
})



var feedback = mongoose.model('user_feedback', feedbackSchema);
module.exports = feedback;