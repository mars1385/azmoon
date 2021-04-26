//------------------import----------------
const BadRequestError = require('../utils/errors/BadRequestError');
const asyncHandler = require('../utils/asyncHandler');

//import models
const Room = require('../models/Room');
const User = require('../models/User');
//------------------end-------------------

// @desc    Create new public Room
// @route   POST /room/public
// @access  Private
exports.createPublicRoom = asyncHandler(async (req, res, next) => {
  // req.body.creator = req.session.userId;
  // req.body.users = req.session.userId;
  req.body.creator = req.user;
  req.body.users = req.user;

  const existRoom = await Room.findOne({ name: req.body.name, role: 'public' });

  if (existRoom) {
    return next(new BadRequestError('Room with this name already exist'));
  }

  const room = await Room.create(req.body);

  res.status(201).json({
    success: true,
    room,
  });
});

// @desc    join to public Room
// @route   POST /room/public/join
// @access  Private
exports.joinToPublicRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.findOne({ name: req.body.name, role: 'public' });

  if (!room) {
    return next(new BadRequestError('Room with this name dose not exist'));
  }

  if (!room.users.includes(req.user)) {
    const users = [...room.users, req.user];

    await Room.findByIdAndUpdate(
      room.id,
      {
        users: users,
      },
      {
        runValidators: true,
        new: true,
      }
    );
  }
  res.status(200).json({
    success: true,
  });
});

// @desc    Create new private Room
// @route   POST /room/private
// @access  Private
exports.createPrivateRoom = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new BadRequestError('Please provide an email'));

  const user = await User.findOne({ email });
  if (!user) return next(new BadRequestError('User with this email dose not exist'));

  const info = {
    name: `Private ${user.email}`,
    creator: req.user,
    role: 'private',
    receiver: user.id,
  };

  const existRoom = await Room.findOne({ name: info.name, role: 'private' });

  if (existRoom) {
    return next(new BadRequestError('Room with this name already exist'));
  }

  const room = await Room.create(info);

  res.status(201).json({
    success: true,
    room,
  });
});

// @desc    Get user public room
// @route   GET /room/public
// @access  Private
exports.getPublicRoom = asyncHandler(async (req, res, next) => {
  const publicRooms = await Room.find({ role: 'public' });

  let yourPublicRooms = [];

  publicRooms.forEach((room) => {
    const users = room.users;
    if (users.includes(req.user)) {
      yourPublicRooms.push(room);
    }
  });

  res.status(201).json({
    success: true,
    yourPublicRooms,
  });
});

// @desc    Get user public room
// @route   GET /room/public
// @access  Private
exports.getPrivateRoom = asyncHandler(async (req, res, next) => {
  const yourRoom = await Room.find({ role: 'private', creator: req.user }).populate('receiver creator');

  const invitedRoom = await Room.find({ role: 'private', receiver: req.user }).populate('receiver creator');

  res.status(201).json({
    success: true,
    privateRoom: yourRoom.concat(invitedRoom),
  });
});
