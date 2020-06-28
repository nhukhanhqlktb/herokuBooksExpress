const bcrypt = require('bcrypt');

const User = require('../models/user.model');

module.exports.index = function(req, res) {
  res.render('auth/login');
}

module.exports.postLogin = async function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  // let wrongLoginCount = db.get('wrongLoginCount').value();
  
  let user = await User.findOne( {email: email} );
  // if (wrongLoginCount >= 4) {
  //   res.render('auth/login', {
  //     errors: ['You type wrong more than 3 times!']
  //   })
  //   return;
  // }
  
  if (!user) {
    // db.set('wrongLoginCount', wrongLoginCount + 1).write();
    res.render('auth/login', {
      errors: ['User does not exist.'],
      values: req.body
    });
    return;
  }
  
  let match = await bcrypt.compare(password, user.password);
  
  if (!match) {
    // db.set('wrongLoginCount', wrongLoginCount + 1).write();
    res.render('auth/login', {
      errors: ['Wrong password.'],
      values: req.body
    });
    return;
  }
  
  // db.set('wrongLoginCount', 0).write();
  res.cookie('userId', user._id, {
    signed: true
  });
  
  // db.get('sessions')
  //   .find({id: req.signedCookies.sessionId})
  //   .set('userId', user._id)
  //   .write();
  
  res.redirect('/users');
}