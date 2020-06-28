const shortid = require('shortid')

const Session = require('../models/session.model');

module.exports = async function(req, res, next) {
  let id = shortid.generate();
  let sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    let session = new Session({
      id: id
    });
    await session.save();
    res.cookie('sessionId', id, {
      signed: true
    });
    sessionId = id;
  }
  
  let session = await Session.findOne({id: sessionId});
  
  if (session.cart) {
    let sumBook = Object.values(session.cart)
    .reduce((cur, acc ) => {return cur + acc});
    res.locals.sumBook = sumBook;
  }  
  
  next();
}