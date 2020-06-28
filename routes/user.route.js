const express = require("express");

const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate')

const route = express.Router();

route.get('/', controller.index);

route.get('/create', controller.create);

route.post('/create', validate.postCreate, controller.postCreate);

route.get('/update/:id', controller.update);

route.post('/update/:id', controller.postUpdate);

route.get('/delete/:id', controller.delete);

module.exports = route;