module.exports.postCreate = function (req, res, next) {
  let errors = [];
  if (!req.body.name) {
    errors.push('Name is required');
  } 
  if (!req.body.email) {
    errors.push('Email is required');
  }
  if (!req.body.password) {
    errors.push('Password is required');
  }
  
  if (errors.length) {    
    res.json(errors);
    return;
  }
  
  if (req.body.name.length > 30) {
    errors.push('Name is more than 30 letters');
    res.json(errors);
    return;
  }
  
  next();
}