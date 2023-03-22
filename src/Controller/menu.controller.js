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

  
        createsendToken(newFoodItem, 201, res);
      } else {
        res.status(400).send("Please enter all the details!!");
      }
});


exports.getFoodItemsbyCategory = catchAsync(async (req, res, next) => {
    console.log(req.query)
    const { category } = req.query;
  
    const foodItems = await foodMenu.find({ category: category });

    // 3) If everything ok, send token to client
    createsendToken(foodItems, 200, res);
    
  });

