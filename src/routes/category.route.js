const route = require('express').Router();
const { categoryController } = require('../controllers');
const validateJwt = require('../middleware/validateJWT');

route.post('/', validateJwt, categoryController.newCategory);

module.exports = route;