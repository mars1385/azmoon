// -----------------imports-----------------
const mongoose = require('mongoose');
// -----------------end---------------------

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  senderName: {
    type: String,
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  room: {
    type: mongoose.Schema.ObjectId,
    ref: 'Room',
  },
  type: {
    type: String,
  },
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
module.exports = mongoose.model('Message', messageSchema);
