//------------------import----------------
const BadRequestError = require('../utils/errors/BadRequestError');
const asyncHandler = require('../utils/asyncHandler');
const path = require('path');
//import model
//------------------end-------------------

// @desc    Upload a file
// @route   POST /message/uploads
// @access  Private
exports.uploadFile = asyncHandler(async (req, res, next) => {
  let upload = req.files.file;

  // if (upload.size > process.env.MAX_FILE_UPLOAD_SIZE) {
  //   return next(new BadRequestError(`Size of image number ${index + 1},is larger than 5 MB`));
  // }

  upload.name = `upload_${req.user}a${upload.size}${path.parse(upload.name).ext}`;
  upload.mv(`${process.env.FILE_UPLOAD_PATH}/${upload.name}`, async (err) => {
    if (err) {
      return next(new BadRequestError('Error in File upload'));
    }
  });

  res.status(200).json({
    upload: upload.name,
    type: upload.mimetype,
  });
});
