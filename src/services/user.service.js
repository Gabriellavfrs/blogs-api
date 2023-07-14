const { User } = require('../models');

const getUserByEmail = (email) => User.findOne({ where: { email } });

const createNewUser = (newUserObj) => User.create(newUserObj);

const getAllUsers = () => User.findAll();

module.exports = {
  getUserByEmail,
  createNewUser,
  getAllUsers,
};