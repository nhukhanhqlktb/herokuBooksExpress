const Transaction = require('../../models/transaction.model');
const User = require('../../models/user.model');
const Book = require('../../models/book.model');

module.exports.index = async function(req, res) {
  let transactions = await Transaction.find({})
                                      .populate('user')
                                      .populate('book');
  res.json(transactions);
}

module.exports.getOne = async function(req, res){
  let transaction = await Transaction.findOne({_id: '5ef5fcc566ab12d75e84025c'})
                                     .populate('user')
                                     .populate('book');
  res.json(transaction);
}

module.exports.postCreate = async function(req, res){
  let transaction = new Transaction({
    user: req.body.userId,
    book: req.body.bookId,
    isComplete: false
  });
  await transaction.save();
  
  res.json(transaction);
}