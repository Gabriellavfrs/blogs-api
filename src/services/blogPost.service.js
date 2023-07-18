const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const createNewPost = async (title, content, userId, categoryIds) => {
  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create({ title, content, userId,
     }, { transaction: t });

    const formattedCategories = categoryIds.map((category) => (
      { postId: newPost.id, categoryId: category }
      ));
      console.log(formattedCategories);
    await PostCategory.bulkCreate(formattedCategories, { transaction: t });
    return newPost;
  });
  
  return result;
};

module.exports = { createNewPost };
