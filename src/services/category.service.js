const { Category } = require('../models');

const createNewCategory = (newCatObj) => Category.create(newCatObj);

module.exports = {
  createNewCategory,
};