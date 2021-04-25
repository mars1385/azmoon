const ErrorResponse = require('../ErrorResponse');

class NotFoundError extends ErrorResponse {
  statusCode = 404;

  constructor(message) {
    super(message);
  }

  errorMessage() {
    return [{ message: this.message }];
  }
}

module.exports = NotFoundError;
