const express = require("express");

const controller = require('../controllers/transaction.controller');

const route = express.Router();

route.get('/', controller.index);

route.get('/:id', controller.getOne);

route.post('/', controller.postCreate);

// route.get('/:id/complete', controller.complete)

module.exports = route;