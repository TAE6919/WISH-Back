const { users } = require('../models');
const datenow = require('../library/time');
const getUserProfile = async (req, res) => {};
const registUser = async (req, res) => {
  const { email, nick, password } = req.body;
  users.create({ email, nick, password, createdAt: datenow() });
  res.send('hi');
};
module.exports = { getUserProfile, registUser };
