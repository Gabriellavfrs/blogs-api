const { CategoryService } = require('../services');

const newCategory = async (req, res) => {
  try {
    const category = await CategoryService.createNewCategory(req.body);
    res.status(201).json(category.dataValues);
  } catch (err) {
    if (err.errors[0].type === 'notNull Violation') {
      return res.status(400).json({ message: err.errors[0].message });
    }
    return res.status(500).json({ message: 'Internal Error', error: err.message });
  }
  };

  const allCategories = async (req, res) => {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Error', error: err.message });
    }
  };

  module.exports = { newCategory, allCategories };