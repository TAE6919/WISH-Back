const express = require('express');
const {
  getAllPostings,
  postPostings,
  getOnePosting,
  patchPosting,
  deletePosting,
} = require('../controller/postings.js');
const {
  createComments,
  getAllComments,
  editComments,
  deleteComments,
} = require('../controller/comments.js');
// const { authMiddleware } = require() '../middlewares/authMiddleware.js'
const postingRouter = express.Router();

postingRouter.route('/').get(getAllPostings).post(postPostings);

postingRouter
  .route('/:id')
  .get(getOnePosting)
  .delete(deletePosting)
  .patch(patchPosting);

postingRouter
  .route('/:postingId/comments')
  .post(createComments)
  .get(getAllComments)
  .patch(editComments)
  .delete(deleteComments);

module.exports = postingRouter;
