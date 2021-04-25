// --------------------import--------------------
const AuthorizationError = require('../utils/errors/AuthorizationError');
const asyncHandler = require('../utils/asyncHandler');
// models
const User = require('../models/User');
// --------------------end-----------------------

// protected route
exports.protectedRoute = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    return next(new AuthorizationError());
  }

  return next();
}); // end
