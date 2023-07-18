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
    return res.status(500).json({ message: 'Internal Error', error: err.message });
  }
  };
  
module.exports = { newPost };
