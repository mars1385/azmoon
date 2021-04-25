// ----------------import------------------
const ErrorResponse = require('../utils/ErrorResponse');
const RequestValidationError = require('../utils/errors/RequestValidationError');
const NotFoundError = require('../utils/errors/NotFoundError');
// ----------------end--------------------
// custom error handler
const errorsHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    console.log(err.message);
    err = new NotFoundError('Not Found');
  }

  if (err.name === 'ValidationError') {
    err = new RequestValidationError(Object.values(err.errors));
  }

  if (err instanceof ErrorResponse) {
    return res.status(err.statusCode).json({
      errors: err.errorMessage(),
    });
  }

  console.log(err.message);
  res.status(500).json({
    errors: [{ message: 'Something went wrong' }],
  });
  next();
};

// export
module.exports = errorsHandler;
