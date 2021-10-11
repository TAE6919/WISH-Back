import express from 'express';
import {
  getAllPostings,
  postPostings,
  getOnePosting,
  patchPosting,
  deletePosting,
} from '../controller/postings.js';
import {
  createComments,
  getAllComments,
  editComments,
  deleteComments,
} from '../controller/comments.js';
// import { authMiddleware } from '../middlewares/authMiddleware.js';
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

export default postingRouter;
