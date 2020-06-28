const Book = require('../models/book.model');
const cloud = require('../configs/cloudinary.config');

module.exports.index = async function(req, res) {
  let books = await Book.find();
  res.render('books/index', {
    books: books
  });
}

module.exports.create = function(req, res) {
  res.render('books/create');
}

module.exports.postCreate = async function(req, res) {
  let result = await cloud.uploads(req.file.path);
  let book = new Book({
    title: req.body.title,
    description: req.body.description,
    coverUrl: result.url
  });
  
  await book.save();
  res.redirect('/books');
}

module.exports.update = async function(req, res) {
  let book = await Book.find( {_id: req.params.id});
  res.render('books/update', {
    book: book[0]
  });
};

module.exports.postUpdate = async function(req, res) {  
  await Book.findOneAndUpdate({_id: req.params.id},
                              {title: req.body.title});  
  res.redirect('/books');
};

module.exports.delete = async function(req, res) {
  let id = req.params.id;
  await Book.findOneAndDelete( {_id: id} );
  res.redirect('/books');
};

