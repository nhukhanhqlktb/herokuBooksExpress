const express = require("express");
const multer = require('multer');

var upload = multer({dest: 'public/uploads/'});

const controller = require('../controllers/profile.controller');

const route = express.Router();

route.get('/', controller.index);

route.post('/avatar', upload.single('avatar'), controller.postUpdate);

module.exports = route;