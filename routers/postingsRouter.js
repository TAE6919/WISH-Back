import express from 'express';
import {
  getAllPostings,
  postPostings,
  getOnePosting,
  patchPosting,
  deletePosting,
<<<<<<< HEAD
} from '../controller/postings.js';
import {
  createComments,
  getAllComments,
  editComments,
  deleteComments,
} from '../controller/comments.js';
=======
  postLike,
} from "../controller/postings.js";
>>>>>>> postings
// import { authMiddleware } from '../middlewares/authMiddleware.js';
const postingRouter = express.Router();

postingRouter.route('/').get(getAllPostings).post(postPostings);

postingRouter
  .route('/:id')
  .get(getOnePosting)
  .delete(deletePosting)
  .patch(patchPosting);

<<<<<<< HEAD
postingRouter
  .route('/:postingId/comments')
  .post(createComments)
  .get(getAllComments)
  .patch(editComments)
  .delete(deleteComments);
=======
postingRouter.route("/:id/like").post(postLike);

postingRouter.route("/:id/comments");
>>>>>>> postings

export default postingRouter;
