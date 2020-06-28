const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');
const Book = require('../models/book.model');

module.exports.index = async function(req, res) {
  let page = parseInt(req.query.page) || 1;
  let perPage = 2;
  let start = (page - 1) * perPage;
  let end = page * perPage;
  
  let transactions = await Transaction.find({}).populate('user', 'name -_id')
                                   .populate('book', 'title -_id');
  
  let sumPage = transactions.length;
  let maxPage = Math.round(sumPage/perPage);
  res.render('transactions/index', {
    transactions: transactions.slice(start, end),
    page,
    perPage,
    maxPage
  })
}

module.exports.create = async function(req, res) {
  let users = await User.find({});
  let books = await Book.find({});
  res.render('transactions/create', {
    users,
    books
  });
}

module.exports.postCreate = async function(req, res) {
  let transaction = new Transaction({
    user: req.body.userId,
    book: req.body.bookId,
    isComplete: false
  });
  await transaction.save();
  
  res.redirect('/transactions');
}

module.exports.complete = async function(req, res) {
  let id = req.params.id;
  let transaction = await Transaction.find({_id: id});
  if (!transaction) {
    res.redirect('/transactions');
  }
  let currentComplete = transaction.isComplete;  
  await Transaction.findOneAndUpdate({_id: id}, {isComplete: !currentComplete});
  
  res.redirect('/transactions')
}