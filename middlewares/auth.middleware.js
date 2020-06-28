const User = require('../models/user.model');

module.exports.requiredAuth = function(req, res, next) {
  if (!req.signedCookies.userId) {
    res.redirect('/auth/login');
    return;
  }
  
  let user = User.findOne({_id: req.signedCookies.userId});
  
  if (!user) {
    res.redirect('/auth/login');
    return;
  }
  
  next();
}