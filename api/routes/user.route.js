const express = require("express");

const controller = require('../controllers/user.controller');
const validate = require('../../validate/user.validate')

const route = express.Router();

route.get('/', controller.index);

route.post('/', validate.postCreate, controller.postCreate);

route.get('/:id', controller.getOne);

route.put('/:id', controller.put);

route.patch('/:id', controller.patch);

route.delete('/:id', controller.delete);

module.exports = route;