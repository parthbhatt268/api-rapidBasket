const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../Model/userModel");
const BaseError = require('../Error/index');
const { catchAsync, catchProfile } = require("../utils/catchAsync")


const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createsendToken = (user, statusCode, res) => {
  console.log("yaha",user)
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

const authControllerProtected = catchAsync(async (req, res, next) => {
    // 1) Getting token and Check if its there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log(token);
    if (!token) {
      return next(new BaseError.UnauthorisedError("You are authorized to Log In"));
    }
  
    // 2) Verification Token
  
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);
    // 3) Check if user still exists
  
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return next(
        new BaseError.UnauthorisedError("The user belonging to this token no longer exist", 401)
      );
    }
    // Grant access to the protected route
    req.user = freshUser;
    next();
  });



module.exports = {signToken,createsendToken, authControllerProtected}