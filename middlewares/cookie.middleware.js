const db = require('../db');

module.exports.setCookie = function (req, res, next) {
  let currentCountCookie = db.get('countCookie').value();
  if (!req.cookies.cookieId) {
    res.cookie('cookieId', '12345');
    db.set('countCookie', 0).write();
    console.log(`<cookie>:<0>`);
  } else {
    // db.set('countCookie', currentCountCookie + 1).write();
    // console.log(`<cookie>:<${currentCountCookie + 1}>`);
  }
  next();
}
