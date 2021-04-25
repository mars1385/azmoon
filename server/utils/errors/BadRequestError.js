const ErrorResponse = require('../ErrorResponse');

class BadRequestError extends ErrorResponse {
  statusCode = 400;

  constructor(message) {
    super(message);
  }

  errorMessage() {
    return [{ message: this.message }];
  }
}

module.exports = BadRequestError;
