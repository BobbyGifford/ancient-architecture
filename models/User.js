const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: {
    type: String
  },
  displayName: {
    type: String
  },
  googleImg: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = User = mongoose.model('users', userSchema);