// -----------------imports-----------------
const mongoose = require('mongoose');
// -----------------end---------------------

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  contacts: [
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
module.exports = mongoose.model('Contact', contactSchema);
