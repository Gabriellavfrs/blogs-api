const { Category } = require('../models');

const createNewCategory = (newCatObj) => Category.create(newCatObj);

const getAllCategories = () => Category.findAll();

module.exports = {
  createNewCategory,
  getAllCategories,
};