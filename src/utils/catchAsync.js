//CATCHING ERRORS IN ASYNC FUNCTION

const catchAsync = (fn) => {
    return (req,res,next) => {
      fn(req, res, next).catch((err) => {
        if (err.name === "MongoServerError" && err.code === 11000) {
          // Duplicate username
          return res
            .status(400)
            .send({ success: false, message: "User already exist!" });
        };
      next(err)
    })        
    }
}

module.exports = {catchAsync}





