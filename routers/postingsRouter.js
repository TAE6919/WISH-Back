import express from "express"
import {
  getAllPostings,
  postPostings,
  getOnePosting,
  patchPosting,
  deletePosting,
<<<<<<< HEAD
} from "../controller/postings.js";
import {
  createComments,
  getAllComments,
  editComments,
  deleteComments,
} from "../controller/comments.js";
// import { authMiddleware } from '../middlewares/authMiddleware.js';
const postingRouter = express.Router();
=======
} from "../controller/postings.js"
>>>>>>> 4f54141d618d77c56473ce3e74a6e113c81a6402

const postingRouter = express.Router()

postingRouter.route("/").get(getAllPostings).post(postPostings)

<<<<<<< HEAD
postingRouter
  .route("/:postingId/comments")
  .post(createComments)
  .get(getAllComments)
  .patch(editComments)
  .delete(deleteComments);
=======
postingRouter.route("/:id").get(getOnePosting).delete(deletePosting).patch(patchPosting)
>>>>>>> 4f54141d618d77c56473ce3e74a6e113c81a6402

postingRouter.route("/:id/comments")

export default postingRouter
