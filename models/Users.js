const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema:
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
