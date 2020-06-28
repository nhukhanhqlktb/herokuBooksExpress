const bcrypt = require('bcrypt');

const User = require('../../models/user.model');

module.exports.index = async function(req, res, next) {
  try {
    var a; a.b();
    let users = await User.find();
    res.json(users)
  }catch (error){
    // next(error);
    res.render('showError', {
      error: {code: '505!', name: 'Internal Error Server'}
    });
  }
}

module.exports.postCreate = async function(req, res) {
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  let user = await User.create({...req.body, password: hashedPassword});
  res.json(user);
}

module.exports.getOne = async function(req, res) {
  try {
    let user = await User.findOne({_id: req.params.id});
    res.json(user)
  } catch {
    res.status('404').json('User not found');
  }
  
}

module.exports.put = async function(req, res) {
  let user;
  if (req.body.password){
    req.body.password = await bcrypt.hash(req.body.password, 10);    
  }
  
  try {
    user = await User.findOneAndReplace({_id: req.params.id}, req.body, {new: true});
    res.json(user);
  } catch {
    user = await User.create(req.body, {new: true});
    res.json(user);
  }  
}

module.exports.patch = async function(req, res) {
  let user;
  if (req.body.password){
    req.body.password = await bcrypt.hash(req.body.password, 10);    
  }
  user = await User.findOneAndUpdate({_id: req.params.id}, req.body);;
  res.json(user)
}

module.exports.delete = async function(req, res) {  
  let user = await User.findOneAndDelete({_id: req.params.id});;
  res.json(user)
}
