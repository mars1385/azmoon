//------------------import----------------
const express = require('express');
// import controllers
const { register, login, userInfo, logout } = require('../controllers/userController');

const { protectedRoute } = require('../middleware/auth');
//------------------end-------------------

// router
const router = express.Router();

// for '/user/register'
router.route('/register').post(register);

// for '/user/login'
router.route('/login').post(login);

// for '/user'
router.route('/').get(protectedRoute, userInfo);

// for '/user/logout'
router.route('/logout').post(protectedRoute, logout);

// export router
module.exports = router;
