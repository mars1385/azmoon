const ErrorResponse = require('../ErrorResponse');

class AuthorizationError extends ErrorResponse {
  statusCode = 401;

  constructor() {
    super('Not authorized to access this route');
  }

  errorMessage() {
    return [{ message: 'Not authorized to access this route' }];
  }
}

module.exports = AuthorizationError;
