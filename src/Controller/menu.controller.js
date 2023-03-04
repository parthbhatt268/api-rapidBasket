const foodMenu = require("../Model/menuModel");
const {catchAsync} = require("../utils/catchAsync")
const {createsendToken} = require("../Middleware/Authenticate")
const {BadRequestError, UnauthorisedError} = require("../Error")


exports.addFoodItem = catchAsync(async (req, res, next) => {
      if (
        req.body.name &&
        req.body.category &&
        req.body.price &&
        req.body.description
      ) {
        const newFoodItem = await foodMenu.create({
          name: req.body.name,
          category: req.body.category,
          price: req.body.price,
          photo: req.body.photo,
          description: req.body.description,
        });
  
        // var token = signToken(newUser._id);
        // // Logging the user into the application using jsonwebtoken right after signing up
        // token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        //   expiresIn: process.env.JWT_EXPIRES_IN,
        // });
  
        createsendToken(newFoodItem, 201, res);
      } else {
        res.status(400).send("Please enter all the details!!");
      }
});


exports.getFoodItemsbyCategory = catchAsync(async (req, res, next) => {
    console.log(req.query)
    const { category } = req.query;
  
    const foodItems = await foodMenu.find({ category: category });
    console.log("gg",foodItems)
    // 3) If everything ok, send token to client
    createsendToken(foodItems, 200, res);
    
  });

