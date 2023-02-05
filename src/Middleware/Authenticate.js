const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../Model/userModel");
const catchAsync = require("../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createsendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // To prevent cross site scripting attacks
    secure: true,
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
  // Remove the password field from the POSTMANS output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.Register = async (req, res, next) => {
  console.log(req.body);
  if (
    req.body.name &&
    req.body.email &&
    req.body.email &&
    req.body.password &&
    req.body.passwordConfirm
  ) {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    var token = signToken(newUser._id);
    // Logging the user into the application using jsonwebtoken right after signing up
    token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    createsendToken(newUser, 201, res);
  } else {
    res.status(400).send("Please enter all the details!!");
  }
};
