const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: {type: mongoose.Schema.Types.ObjectId, ref: 'food'}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
