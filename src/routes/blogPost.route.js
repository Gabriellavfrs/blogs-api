const route = require('express').Router();
const { blogPostController } = require('../controllers');
const validateJwt = require('../middleware/validateJWT');

route.get('/search', validateJwt, blogPostController.postBySearch);
route.post('/', validateJwt, blogPostController.newPost);
route.get('/:id', validateJwt, blogPostController.postById);
route.get('/', validateJwt, blogPostController.allPosts);
route.put('/:id', validateJwt, blogPostController.updatePost);
route.delete('/:id', validateJwt, blogPostController.removePost);

module.exports = route;