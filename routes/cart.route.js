const express = require("express");

const controller = require('../controllers/cart.controller');

const route = express.Router();

route.get('/', controller.index);

route.get('/add/:bookId', controller.addToCart);

route.get('/rent/', controller.rentBooks);

module.exports = route;