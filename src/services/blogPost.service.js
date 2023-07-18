const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
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
    await PostCategory.bulkCreate(formattedCategories, { transaction: t });
    return newPost;
  });
  
  return result;
};

const getAllPosts = () => BlogPost.findAll({
  include: [
  { model: User, as: 'user', attributes: { exclude: 'password' } },
  { model: Category, as: 'categories', through: { attributes: [] } },
  ] });

const getPostById = (id) => BlogPost.findOne({
  where: { id },
  include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const updatePost = (id, title, content) => BlogPost.update({ title, content }, { where: { id } });

const removePost = (id) => BlogPost.destroy({ where: { id } });

const getPostBySearch = (searchTerm) => BlogPost.findAll({
  where: { 
    [Op.or]: [
      {
        title: { [Op.like]: `%${searchTerm}%` },
      },
      {
        content: { [Op.like]: `%${searchTerm}%` },
      },
    ],
  },
  include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

module.exports = { 
  createNewPost, 
  getPostById, 
  getAllPosts, 
  updatePost, 
  removePost, 
  getPostBySearch,
};
