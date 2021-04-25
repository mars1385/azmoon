// to replace try catch block
const asyncHandler = (myFn) => (req, res, next) => Promise.resolve(myFn(req, res, next)).catch(next);

module.exports = asyncHandler;
