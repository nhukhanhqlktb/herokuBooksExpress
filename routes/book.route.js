const express = require("express");
const multer = require('multer');

const controller = require('../controllers/book.controller');

const route = express.Router();
var upload = multer({dest: 'public/uploads/'});

route.get('/', controller.index);

route.get('/create', controller.create);

route.post('/create', upload.single('avatar'), controller.postCreate);

route.get('/update/:id', controller.update);

route.post('/update/:id', controller.postUpdate);

route.get('/delete/:id', controller.delete);

module.exports = route;