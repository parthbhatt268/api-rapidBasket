const orderDetail = require("../Model/orderModel");
const {catchAsync} = require("../utils/catchAsync")
const {createsendToken} = require("../Middleware/Authenticate")
const {BadRequestError, UnauthorisedError} = require("../Error")
const stripe = require("stripe")("sk_test_51MqHSBSGD0NxWjnW7XG6MlAGlWRZBO314hJaBp5FUJIHa6VGyeoSqy7rIfi60lUPbYSXRDfXulOuJLAz0hPhAmJ300d4dB71Ur");


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
        const items = req.body.orderDetail.map(order => {
          return {
            price_data: {
              currency: "inr", 
            product_data: {
                name: order.p_name,
              },
              unit_amount: order.p_price * 100,
            },
            quantity: order.p_itemCount,
          }
        })
        const session = await stripe.checkout.sessions.create({ 
          payment_method_types: ["card"], 
          line_items:items, 
          allow_promotion_codes: true,
          mode: "payment", 
          success_url: "http://localhost:3000/success", 
          cancel_url: "http://localhost:3000/cancel", 
        }); 
        res.json({ id: session.id }); 
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



