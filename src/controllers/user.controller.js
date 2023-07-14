const { createToken } = require('../auth/auth-functions');
const { UserService } = require('../services');

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
  return res.status(500).json({ message: 'Erro interno', error: err.message });
}
};

module.exports = newUser;