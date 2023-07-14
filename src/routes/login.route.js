const route = require('express').Router();
const { userController } = require('../controllers');

route.post('/', userController.userByEmail);

module.exports = route;