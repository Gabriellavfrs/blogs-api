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
  return res.status(500).json({ message: 'Erro interno', error: err.message });
}
};

module.exports = userByEmail;