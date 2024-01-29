const mongoose = require('mongoose');

// const userBooksSchema = new mongoose.Schema({
//   book: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'BOOK',
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true

  },
  password: {
    type: String,
    required: true
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BOOK',
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Users = new mongoose.model("USER", userSchema);

module.exports = Users;