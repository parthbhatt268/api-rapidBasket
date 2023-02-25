const User = require("../Model/userModel");
const {catchAsync} = require("../utils/catchAsync")
const {createsendToken, signToken} = require("../Middleware/Authenticate")
const {BadRequestError, UnauthorisedError} = require("../Error")


exports.Register = catchAsync(async (req, res, next) => {
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
});


exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    //1) Check if email and password exist
    if (!email || !password) {
      return next(new BadRequestError("Please provide Email and Password"));
    }
  
    // 2) Check if the user exist and password is correct
    const user = await User.findOne({ email: email }).select("+password");
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new UnauthorisedError("Incorrect email or password", 401));
    }
  
    console.log(user);
  
    // 3) If everything ok, send token to client
    createsendToken(user, 200, res);
    
  });