import express from "express"
import {
  getAllPostings,
  postPostings,
  getOnePosting,
  patchPosting,
  deletePosting,
} from "../controller/postings.js"
import {
  createComments,
  getAllComments,
  editComments,
  deleteComments,
} from "../controller/comments.js"

const postingRouter = express.Router()

postingRouter.route("/").get(getAllPostings).post(postPostings)

postingRouter
  .route("/:postingId/comments")
  .post(createComments)
  .get(getAllComments)
  .patch(editComments)
  .delete(deleteComments)

postingRouter.route("/:id/comments")

export default postingRouter
