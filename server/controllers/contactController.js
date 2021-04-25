//------------------import----------------
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const asyncHandler = require('../utils/asyncHandler');
const axios = require('axios');

//import models
const Contact = require('../models/Contact');
const User = require('../models/User');
//------------------end-------------------

// @desc    Add new contact
// @route   POST /contact
// @access  Private
exports.addContact = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const existUser = await User.findOne({ email });

  if (!existUser) {
    return next(new NotFoundError('User can not be found'));
  }

  const existContact = await Contact.findOne({ user: req.session.userId });

  if (existContact) {
    const contacts = [...existContact.contacts, existUser.id];

    await Contact.findByIdAndUpdate(
      existContact.id,
      {
        contacts: contacts,
      },
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(200).json({
      success: true,
    });
  } else {
    const userContact = {
      user: req.session.userId,
      contacts: [existUser.id],
    };
    await Contact.create(userContact);
    res.status(200).json({
      success: true,
    });
  }
});

// @desc    get user contacts
// @route   GET /contact
// @access  Private
exports.getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findOne({ user: req.session.userId });

  if (!contact) {
    return next(new NotFoundError('User can not be found'));
  }
  res.status(200).json({
    contacts: contact.contacts,
  });
});
