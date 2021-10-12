const { users, postings } = require('../models');
const datenow = require('../library/time');

const getUserProfile = async (req, res) => {
  // const result = await postings.findAll({
  //   include: [
  //     {
  //       model: users,
  //       attributes: ['nick'],
  //     },
  //     {
  //       model: users,
  //       attributes: ['email'],
  //     },
  //   ],
  // });

  // res.json({ result });

  const result = await users.findByPk(3, {
    attributes: ['email', 'nick'],
    include: [
      {
        model: postings,
        attributes: ['title', 'text'],
      },
    ],
  });
  res.send(result);
};

const registUser = async (req, res) => {
  const { email, nick, password } = req.body;
  users.create({ email, nick, password, createdAt: datenow() });
  res.send('hi');
};
module.exports = { getUserProfile, registUser };
