const {
    StatusCodes,
    getReasonPhrase
  } = require('http-status-codes');

  
    class AppError extends Error {
     httpCode;
     httpMessage;
     moreInformation;
     innerException;
    constructor(name, moreInformation, innerException) {
      super(name); // new Error(name)
      Error.captureStackTrace(this, this.constructor);
      this.httpMessage = this.constructor.name;
      this.moreInformation = moreInformation;
      this.innerException = innerException ? innerException : {};
    }
  }
   class BadRequestError extends AppError {
    httpCode = StatusCodes.BAD_REQUEST;
    constructor(moreInformation, innerException) {
      super(getReasonPhrase(StatusCodes.BAD_REQUEST), moreInformation, innerException)
    }
  }
   class UnauthorisedError extends AppError {
    httpCode = StatusCodes.UNAUTHORIZED;
    constructor(moreInformation, innerException) {
      super(getReasonPhrase(StatusCodes.UNAUTHORIZED), moreInformation, innerException)
    }
  }
   class ForbiddenError extends AppError {
    httpCode = StatusCodes.FORBIDDEN;
    constructor(moreInformation, innerException) {
      super(getReasonPhrase(StatusCodes.FORBIDDEN), moreInformation, innerException)
    }
  }
   class NotFoundError extends AppError {
    httpCode = StatusCodes.NOT_FOUND;
    constructor(moreInformation, innerException) {
      super(getReasonPhrase(StatusCodes.NOT_FOUND), moreInformation, innerException)
    }
  }
   class UnprocessableEntityError extends AppError {
    httpCode = StatusCodes.UNPROCESSABLE_ENTITY;
    constructor(moreInformation, innerException) {
      super(getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY), moreInformation, innerException)
    }
  }
   class ServerError extends AppError {
    httpCode = StatusCodes.INTERNAL_SERVER_ERROR;
    constructor(moreInformation, innerException) {
      super(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR), moreInformation, innerException)
    }
  }


module.exports = {AppError, BadRequestError, UnauthorisedError, NotFoundError,ServerError, UnprocessableEntityError, ForbiddenError}