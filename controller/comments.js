const { nowDate } = require('../library/time.js');
const { comments } = require('../models');
const createComments = async (req, res) => {
  const { postingID } = req.params;
  const { text } = req.body;
  const authorID = req.get('authorID');
  await comments.create({ postingID, authorID, text });
  res.send('hi');
};

const getAllComments = async (req, res) => {
  const { postingID } = req.params;
  const result = await comments.findAll({ where: { postingID } });
  res.send(result);
};

const editComments = async (req, res) => {
  const { postingID } = req.params;
  const { text } = req.body;
  const authorID = req.get('authorID');

  const result = await comments.update(
    { text },
    { where: { authorID, postingID } }
  );
  res.send(result);
};

const deleteComments = async (req, res) => {
  const { postingID } = req.params;

  const authorID = req.get('authorID');
  const result = await comments.destroy({ where: { postingID, authorID } });
  res.send({ result });
};

module.exports = {
  createComments,
  getAllComments,
  editComments,
  deleteComments,
};
