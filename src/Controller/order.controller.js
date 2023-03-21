const orderDetail = require("../Model/orderModel");
const {catchAsync} = require("../utils/catchAsync")
const {createsendToken} = require("../Middleware/Authenticate")
const {BadRequestError, UnauthorisedError} = require("../Error")


exports.postOrder = catchAsync(async (req, res, next) => {
      if (
        req.body.custId &&
        req.body.orderDetail
      ) {
        const newOrderForCustId = await orderDetail.create({
          custId: req.body.custId,
          orderDetail: req.body.orderDetail,
        });
  
        createsendToken(newOrderForCustId, 201, res);
      } else {
        res.status(400).send("Please enter all the details!!");
      }
});


