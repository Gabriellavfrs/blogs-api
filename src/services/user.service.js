const { User } = require('../models');

const getUserByEmail = (email) => User.findOne({ where: { email } });

const createNewUser = (newUserObj) => User.create(newUserObj);

const getAllUsers = () => User.findAll({ attributes: { exclude: ['password'] } });

const getUserById = (id) => User.findOne({
  where: { id },
  attributes: { exclude: 'password' },
});

const removeUser = (id) => User.destroy({ where: { id } });

module.exports = {
  getUserByEmail,
  createNewUser,
  getAllUsers,
  getUserById,
  removeUser,
};