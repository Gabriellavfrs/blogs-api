const route = require('express').Router();
const { blogPostController } = require('../controllers');
const validateJwt = require('../middleware/validateJWT');

route.post('/', validateJwt, blogPostController.newPost);
route.get('/:id', validateJwt, blogPostController.postById);
route.get('/', validateJwt, blogPostController.allPosts);

module.exports = route;