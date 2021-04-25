const ErrorResponse = require('../ErrorResponse');

class RequestValidationError extends ErrorResponse {
  statusCode = 400;
  errors;
  constructor(errors) {
    super('Invalid request input');
    this.errors = errors;
  }

  errorMessage() {
    return this.errors.map((error) => ({
      message: error.message,
      field: error.path,
    }));
  }
}

module.exports = RequestValidationError;
