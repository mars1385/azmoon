//------------------import----------------
const express = require('express');
// import controllers
const { uploadFile } = require('../controllers/messageController');

const { protectedRoute } = require('../middleware/auth');
//------------------end-------------------

// router
const router = express.Router();

// for '/message/uploads'
router.route('/uploads').post(protectedRoute, uploadFile);

// export router
module.exports = router;
