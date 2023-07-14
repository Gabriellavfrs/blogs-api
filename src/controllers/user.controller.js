const { createToken } = require('../auth/auth-functions');
const { UserService } = require('../services');

const isBodyValid = (email, password) => email && password;

const userByEmail = async (req, res) => {
try {
  const { email, password } = req.body;

  if (!isBodyValid(email, password)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await UserService.getUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  delete user.dataValues.password;
  
  const token = createToken({ data: user.dataValues });

  res.status(200).json({ token });
} catch (err) {
  return res.status(500).json({ message: 'Internal Error', error: err.message });
}
};


const newUser = async (req, res) => {
try {
  const isExistingEmail = await UserService.getUserByEmail(req.body.email);

  if (isExistingEmail) {
    return res.status(409).json({ message: 'User already registered' });
  }

  const user = await UserService.createNewUser(req.body);
  delete user.password;
  const token = createToken({ data: user });

  res.status(201).json({ token });
} catch (err) {
  if (err.errors[0].type === 'Validation error') {
    return res.status(400).json({ message: err.errors[0].message });
  }
  return res.status(500).json({ message: 'Internal Error', error: err.message });
}
};

const allUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: 'Internal Error',
      error: err.message,
    });
  }
};

const userById = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await UserService.getUserById(id);
    if(!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Error', error: err.message });
  }
};

module.exports = { userByEmail, newUser, allUsers, userById };