const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transactionSchema = new mongoose.Schema({
  "user": { type: Schema.Types.ObjectId, ref: 'User' },
  "book": { type: Schema.Types.ObjectId, ref: 'Book' },
  "isComplete": Boolean
});

const Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

module.exports = Transaction;