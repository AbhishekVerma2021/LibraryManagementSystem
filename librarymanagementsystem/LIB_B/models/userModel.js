const mongoose = require('mongoose');

const userBooks= new mongoose.Schema({
  
});

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
  date: {
    type: Date,
    default: Date.now,
  },
});

const Users= new mongoose.model("User",userSchema);

module.exports=Users;