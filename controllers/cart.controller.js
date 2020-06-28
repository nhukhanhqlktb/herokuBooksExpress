const Session = require('../models/session.model');
const Book = require('../models/book.model');
const Transaction = require('../models/transaction.model');

module.exports.index = async function(req, res) {
  let session = await Session.findOne({id: req.signedCookies.sessionId});
  let books = [];
  for (let bookId in session.cart) {
    var book = await Book.findOne( {_id: bookId} );
    books.push({title: book.title,
                description: book.description,
                coverUrl: book.coverUrl,
                id: bookId,
                count: session.cart[bookId]
               });
  }
  res.render('cart/index', {
    books
  });
}

module.exports.addToCart = async function(req, res) {
  let bookId = req.params.bookId;
  let sessionId = req.signedCookies.sessionId;
  
  let session = await Session.findOne({id: sessionId});
  if (!session.cart){
    await Session.findOneAndUpdate({id: sessionId}, {[`cart.${bookId}`]: 1});
  }else {
    let count = session.cart[bookId] || 0;
    await Session.findOneAndUpdate({id: sessionId}, {[`cart.${bookId}`]: count + 1});
  }
  
  res.redirect('/books');
}

module.exports.rentBooks = async function(req, res){
  let sessionId = req.signedCookies.sessionId;
  let session = await Session.findOne({id: sessionId});
  let transaction;
  let userId = req.signedCookies.userId;
  
  if (!userId){
    res.redirect('/auth/login');
    return;
  }
  
  let books = session.cart;
  for (let bookId in books){
    transaction = new Transaction({
      user: userId,
      book: bookId,
      isComplete: false
    });
    console.log(transaction, '===');
    await transaction.save();
  }
  
  await Session.updateOne({id: sessionId}, {$unset: {cart: 1}});
  
  res.redirect('/cart');
}