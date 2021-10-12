const { postings } = require('../models');
const nowDate = require('../library/time');
const postPostings = async (req, res) => {
  const authorID = req.get('authorID');
  const { title, text } = req.body;
  postings.create({ authorID, title, text });
  res.send('hi');
};

// 게시물 전체 조회(READ ALL)
const getAllPostings = async (req, res) => {
  const allPost = await postings.findAll();
  res.send({ allPost });
};

//특정 게시물 조회 (READ ONE)
const getOnePosting = async (req, res) => {
  const { id } = req.params;
  const result = await postings.findByPk(id);
  res.send(result);
};

// 특정 게시물의 일부 속성 수정
const patchPosting = async (req, res) => {
  const { id } = req.params;
  const authorID = req.get('authorID');
  const { title, text } = req.body;
  const result = await postings.update(
    { title, text, createdAt: nowDate() },
    { where: { id, authorID } }
  );
  console.log(result);
  res.send('hi');
};

// 특정 게시물을 삭제
const deletePosting = async (req, res) => {
  const { id } = req.params;
  const authorID = req.get('authorID');
  const result = await postings.destroy({ where: { id, authorID } });
  res.send(result);
};

//좋아요
const postLike = async (req, res) => {};

module.exports = {
  postPostings,
  getAllPostings,
  getOnePosting,
  patchPosting,
  deletePosting,
  postLike,
};
