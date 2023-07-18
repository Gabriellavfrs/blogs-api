const route = require('express').Router();
const { blogPostController } = require('../controllers');
const validateJwt = require('../middleware/validateJWT');

route.post('/', validateJwt, blogPostController.newPost);

module.exports = route;