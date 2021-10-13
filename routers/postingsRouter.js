import express from "express";
import {
  getAllPostings,
  postPostings,
  getOnePosting,
  patchPosting,
  deletePosting,
  postLike,
} from "../controller/postings.js";
import {
  createComments,
  getAllComments,
  editComments,
  deleteComments,
} from "../controller/comments.js";
import { uploadFile } from "../middlewares/uploadMiddleware.js";
// import { authMiddleware } from '../middlewares/authMiddleware.js';
const postingRouter = express.Router();

postingRouter
  .route("/")
  .get(getAllPostings)
  .post(uploadFile.single("image"), postPostings);

postingRouter
  .route("/:postingId")
  .get(getOnePosting)
  .delete(deletePosting)
  .patch(patchPosting);

postingRouter.route("/:postingId/like").post(postLike);

postingRouter
  .route("/:postingId/comments")
  .post(createComments)
  .get(getAllComments)
  .patch(editComments)
  .delete(deleteComments);

postingRouter.route("/:id/comments");

export default postingRouter;
