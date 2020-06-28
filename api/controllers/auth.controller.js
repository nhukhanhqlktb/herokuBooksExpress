const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const User = require('../../models/user.model');

module.exports.postLogin = async function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let loginInfo = {success: false, errors: []};
  
  let user = await User.findOne( {email: email} );
  
  if (!user) {
    loginInfo.errors.push('User does not exist.');
    res.json(loginInfo)
    return;
  }
  
  let match = await bcrypt.compare(password, user.password);
  
  if (!match) {
    loginInfo.errors.push('Wrong password.');
    res.json(loginInfo)
    return;
  }
  
  const payload = {id: user._id};
  const accessToken = jwt.sign(payload, process.env.jwt, {expiresIn: 10*60*1000});
  loginInfo.success = true;
  loginInfo.accessToken = accessToken;
  res.json(loginInfo);
}