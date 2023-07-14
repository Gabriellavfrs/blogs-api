const { User } = require('../models');

const getUserByEmail = (email) => User.findOne({ where: { email } });

const createNewUser = (newUserObj) => User.create(newUserObj);

module.exports = {
  getUserByEmail,
  createNewUser,
};