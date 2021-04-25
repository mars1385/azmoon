//------------------import----------------
const express = require('express');
// import controllers
const {
  getPrivateRoom,
  getPublicRoom,
  createPrivateRoom,
  createPublicRoom,
  joinToPublicRoom,
} = require('../controllers/roomController');

const { protectedRoute } = require('../middleware/auth');
//------------------end-------------------

// router
const router = express.Router();

// for '/room/public'
router.route('/public').post(protectedRoute, createPublicRoom).get(protectedRoute, getPublicRoom);

// for '/room/public'
router.route('/public/join').post(protectedRoute, joinToPublicRoom);

// for '/room/private'
router.route('/private').post(protectedRoute, createPrivateRoom).get(protectedRoute, getPrivateRoom);

// export router
module.exports = router;
