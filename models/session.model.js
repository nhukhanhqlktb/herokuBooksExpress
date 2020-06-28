const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
  "id": String,
  "wrongLoginCount": Number,
  "cart": Object, //Hỏi xem kiểu như thế này ???
  "userId": String
});

const Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;