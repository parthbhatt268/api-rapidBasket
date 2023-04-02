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
          orderDate: req.body.orderDate,
          orderDetail: req.body.orderDetail,
        });
  
        createsendToken(newOrderForCustId, 201, res);
      } else {
        res.status(400).send("Please enter all the details!!");
      }
});



exports.getOrderHistoryOfCustomer = catchAsync(async (req, res, next) => {
  console.log(req.query)
  const { custId } = req.query;

  const orderHistory = await orderDetail.find({ custId: custId });

  // 3) If everything ok, send token to client
  createsendToken(orderHistory, 200, res);
  
});



