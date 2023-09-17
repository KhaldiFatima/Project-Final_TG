const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },

  content: {
    type: String,
    require: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  seen: {
    type: Boolean,
    default: false,
  },
});

const Model = mongoose.model('Message', messageSchema);

module.exports = Model;
