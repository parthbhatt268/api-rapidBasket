const { AppError } = require("../Error");
const ErrorHandlerMw = (
    err,
    req,
    res,
    next
) => {
    if (err instanceof AppError) {
        if (err.innerException && err.innerException instanceof Error) {
            const exception = err.innerException;
            err.innerException = {
                name: exception.name,
                stack: `${exception.stack}`
            };
        }
        
        res.status(err.httpCode).json({ httpMessage: err.httpMessage, moreInformation: err.moreInformation });
    } else {
        
        res.status(500).json({ moreInformation: `Unhandled_Error - ${err.toString()}` });
    }
};


module.exports = ErrorHandlerMw