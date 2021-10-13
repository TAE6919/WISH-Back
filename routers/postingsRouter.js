import express from "express"
import {
  getAllPostings,
  postPostings,
  getOnePosting,
  patchPosting,
  deletePosting,
  postLike,
} from "../controller/postings.js"
import {
  createComments,
  getAllComments,
  editComments,
  deleteComments,
} from "../controller/comments.js"
import { uploadFile } from "../middlewares/uploadMiddleware.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
const postingRouter = express.Router()

postingRouter.route("/").get(getAllPostings).post(authMiddleware, postPostings)

postingRouter
  .route("/:postingId")
  .get(getOnePosting)
  .delete(authMiddleware, deletePosting)
  .patch(authMiddleware, patchPosting)

postingRouter.route("/:postingId/like").post(authMiddleware, postLike)

postingRouter
  .route("/:postingId/comments")
  .post(authMiddleware, createComments)
  .get(getAllComments)
  .patch(authMiddleware, editComments)
  .delete(authMiddleware, deleteComments)

postingRouter.route("/:id/comments")

export default postingRouter
