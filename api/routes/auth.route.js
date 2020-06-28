const express = require("express");

const controller = require('../controllers/auth.controller');

const route = express.Router();

route.post('/', controller.postLogin);

module.exports = route;