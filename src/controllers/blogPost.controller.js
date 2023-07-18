const { BlogPostService, CategoryService } = require('../services');

const isBodyValid = (title, content, categoryIds) => title && content && categoryIds;

const newPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.payload.data;
  
    if (!isBodyValid(title, content, categoryIds)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const allCategories = await CategoryService.getAllCategories();

    const validateCategoryId = categoryIds.every((categoryId) => 
    allCategories.map(({ id }) => id).includes(categoryId));

    if (!validateCategoryId) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }

    const post = await BlogPostService.createNewPost(title, content, userId, categoryIds);
    res.status(201).json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  };

  const allPosts = async (req, res) => {
    try {
      const posts = await BlogPostService.getAllPosts();
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  const postById = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await BlogPostService.getPostById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post does not exist' });
      }

      return res.status(200).json(post);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  const updatePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { id: userId } = req.payload.data;
      const { title, content } = req.body;

      if (!(title && content)) {
        return res.status(400).json({ message: 'Some required fields are missing' });
      }

      const postToUpdate = await BlogPostService.getPostById(id);
      
      if (postToUpdate.user.id !== userId) {
        return res.status(401).json({ message: 'Unauthorized user' });
      }

      await BlogPostService.updatePost(id, title, content);
      const updatedPost = await BlogPostService.getPostById(id);
      return res.status(200).json(updatedPost);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  const removePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { id: userId } = req.payload.data;

      const postToDelete = await BlogPostService.getPostById(id);
      
      if (!postToDelete) {
        return res.status(404).json({ message: 'Post does not exist' });
      }

      if (postToDelete.user.id !== userId) {
        return res.status(401).json({ message: 'Unauthorized user' });
      }

      await BlogPostService.removePost(id);

      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  const postBySearch = async (req, res) => {
    try {
      const { q } = req.query;
      const posts = await BlogPostService.getPostBySearch(q);
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
  
module.exports = { newPost, allPosts, postById, updatePost, removePost, postBySearch };
