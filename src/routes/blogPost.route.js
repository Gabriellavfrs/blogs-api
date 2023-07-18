const route = require('express').Router();
const { blogPostController } = require('../controllers');
const validateJwt = require('../middleware/validateJWT');

route.post('/', validateJwt, blogPostController.newPost);
route.get('/:id', validateJwt, blogPostController.postById);

module.exports = route;