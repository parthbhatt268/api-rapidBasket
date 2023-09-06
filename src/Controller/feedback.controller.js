const feedback = require("../Model/feedbackModel");
const { catchAsync } = require("../utils/catchAsync")
const { createsendToken } = require("../Middleware/Authenticate")
const { BadRequestError, UnauthorisedError } = require("../Error")

exports.feedbackController = catchAsync(async (req, res, next) => {
  if (
    req.body.custId &&
    req.body.emailId &&
    req.body.Message
  ) {
    const customerFeedback = await feedback.create({
      custId: req.body.custId,
      emailId: req.body.emailId,
      Message: req.body.Message,
      createdAt: new Date()
    });
    res.status(200).json({
      status: "success",
      data: {
        Message: "Feedback Submitted Successfully.",
      }
    });
  } else {
    res.status(400).send("Please enter all the details!!");
  }
});
