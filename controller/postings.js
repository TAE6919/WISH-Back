const postPostings = async (req, res) => {};

// 게시물 전체 조회(READ ALL)
const getAllPostings = async (req, res) => {};

//특정 게시물 조회 (READ ONE)
const getOnePosting = async (req, res) => {};

// 특정 게시물의 일부 속성 수정
const patchPosting = async (req, res) => {};

// 특정 게시물을 삭제
const deletePosting = async (req, res) => {};

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
