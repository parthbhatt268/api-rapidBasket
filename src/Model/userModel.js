const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
  custId: {
    type: String,
  },
  
  name: {
    type: String,
    //required: [true, "Please tell us your name"],
  },

  email: {
    type: String,
    //required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
  },
  password: {
    type: String,
    //required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    //required: [true, "Please confirm password"],
    validate: {
      // This only works on CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: "Password do not match",
    }
  },
  address: {
    type: String,
    //required: [false, "Please confirm password"],
    // message: "Password do not match",
  },
})

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the passwrod Confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};


var User = mongoose.model('User', userSchema);
module.exports = User;