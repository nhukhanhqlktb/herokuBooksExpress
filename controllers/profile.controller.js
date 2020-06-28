
const cloud = require('../configs/cloudinary.config');
const User = require('../models/user.model');

module.exports.index = function(req, res) {
  res.render('profile/index');
}

module.exports.postUpdate = async function(req, res) {
  let result = await cloud.uploads(req.file.path);
  
  await User.findOneAndUpdate({_id: res.locals.user.id}, {avatarUrl: result.url});
    
  res.render('profile/index');
}