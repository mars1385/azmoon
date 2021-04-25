// -----------------imports-----------------
const mongoose = require('mongoose');
// -----------------end---------------------

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Room need a name'],
    unique: true,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  role: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// export model
module.exports = mongoose.model('Room', roomSchema);
