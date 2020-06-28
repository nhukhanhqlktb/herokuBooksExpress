const User = require('../models/user.model');

module.exports = async function(req, res, next) {
  if (!req.signedCookies.userId) {
    next();
    return;
  }
  
  let user = await User.findOne({_id: req.signedCookies.userId});

  if (!user) {
    next();
    return;
  }
  
  res.locals.user = user;
  next();
}