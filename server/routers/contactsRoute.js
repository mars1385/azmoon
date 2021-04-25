//------------------import----------------
const express = require('express');
// import controllers
const { addContact, getContact } = require('../controllers/contactController');

const { protectedRoute } = require('../middleware/auth');
//------------------end-------------------

// router
const router = express.Router();

// for '/contact'
router.route('/').post(protectedRoute, addContact).get(protectedRoute, getContact);

// export router
module.exports = router;
