const { nowDate } = require('../library/time.js');

const createComments = (req, res) => {
  const { postingID } = req.params;
  const authorID = req.get('authorID');
  console.log(postingID, authorID);
};

const getAllComments = async (req, res) => {};

const editComments = async (req, res) => {};

const deleteComments = async (req, res) => {};

module.exports = {
  createComments,
  getAllComments,
  editComments,
  deleteComments,
};
