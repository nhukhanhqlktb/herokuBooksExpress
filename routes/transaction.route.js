const express = require("express");

const controller = require('../controllers/transaction.controller');

const route = express.Router();

route.get('/', controller.index);

route.get('/create', controller.create);

route.post('/create', controller.postCreate);

route.get('/:id/complete', controller.complete)

module.exports = route;