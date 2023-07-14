const route = require('express').Router();
const { userController } = require('../controllers');
const validateJwt = require('../middleware/validateJWT');

route.post('/', userController.newUser);
route.get('/', validateJwt, userController.allUsers);

module.exports = route;