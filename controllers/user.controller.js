const bcrypt = require('bcrypt');

const User = require('../models/user.model');

module.exports.index = async function(req, res) { 
  let page = parseInt(req.query.page) || 1;
  let perPage = 2;
  let sumPage = await User.countDocuments();
  let maxPage = Math.round(sumPage/perPage);
  let skipPage = (page - 1) * perPage;
  let users = await User.aggregate([{$skip: skipPage}, {$limit: perPage}]);
  res.render('users/index', {
    users: users,
    page,
    perPage,
    maxPage
  })
}

module.exports.create = function(req, res) {
  res.render('users/create');
}

module.exports.postCreate = async function(req, res) {
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  await user.save();
  res.redirect('/users');
}

module.exports.update = async function (req, res) {
  let userOld = await User.findOne({_id: req.params.id});
  res.render('users/update', {
    userOld
  });
}

module.exports.postUpdate = async function(req, res) {
  await User.findOneAndUpdate({_id: req.params.id}, {name: req.body.name});
                                                     
  res.redirect('/users');
}

module.exports.delete = async function(req, res) {
  await User.findOneAndDelete({_id: req.params.id});
  res.redirect('/users');
}