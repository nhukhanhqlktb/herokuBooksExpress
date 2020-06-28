const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  "name": String,
  "email": String,
  "password": String,
  "avatarUrl": String,
  "isAdmin": Boolean
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;