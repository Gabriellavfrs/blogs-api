const route = require('express').Router();
const { userController } = require('../controllers');
const validateJwt = require('../middleware/validateJWT');

route.post('/', userController.newUser);
route.get('/:id', validateJwt, userController.userById);
route.get('/', validateJwt, userController.allUsers);
route.delete('/me', validateJwt, userController.removeUser);

module.exports = route;