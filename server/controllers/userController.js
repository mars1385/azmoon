//------------------import----------------
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const asyncHandler = require('../utils/asyncHandler');
const axios = require('axios');
const jwt = require('jsonwebtoken');

//import models
const Room = require('../models/Room');
const User = require('../models/User');
//------------------end-------------------

// @desc    Register new user
// @route   POST user/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const emailValidation = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gm;

  if (!emailValidation.test(email)) return next(new BadRequestError('Please add a valid email'));

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) return next(new BadRequestError('An User already exist with this email'));

  const emailChecker = await axios.get(
    `http://apilayer.net/api/check?access_key=${process.env.API_KEY}&email=${email}`
  );

  if (emailChecker.data.smtp_check === false) {
    return next(new BadRequestError('Please add a valid email'));
  }
  req.body.userName = emailChecker.data.user;
  const user = await User.create(req.body);

  const publicRoom = await Room.findOne({ name: 'public-room' });

  const users = [...publicRoom.users, user.id];

  await Room.findByIdAndUpdate(
    publicRoom._id,
    {
      users,
    },
    { new: true, runValidators: true }
  );

  const token = jwt.sign({ name: user.name, id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  // req.session.userId = user.id;
  res.status(201).json({
    user,
    token,
  });
});

// @desc    Login user
// @route   POST user/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new BadRequestError('Please provide an email'));

  const user = await User.findOne({ email });
  if (!user) return next(new BadRequestError('Email is Wrong'));

  const token = jwt.sign({ name: user.name, id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  // req.session.userId = user.id;

  res.status(200).json({
    user,
    token,
  });
});

// @desc    get user Information
// @route   GET user/
// @access  Private
exports.userInfo = asyncHandler(async (req, res, next) => {
  // const user = await User.findById(req.session.userId);
  const user = await User.findById(req.user);

  if (!user) {
    return next(new NotFoundError('User can not be found'));
  }
  res.status(200).json({
    user: {
      userId: user.id,
      userName: user.userName,
      email: user.email,
    },
  });
});

// @desc    Log out user
// @route   post user/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(new RequestError('An error has occurred'));
    }
    res.clearCookie(process.env.COOKIE_NAME);
    res.status(200).json({
      success: true,
    });
  });
});
