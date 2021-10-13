<<<<<<< HEAD
import mongoose from "mongoose"
=======
import mongoose from "mongoose";
>>>>>>> postings

const { Schema } = mongoose

const commentSchema = new Schema({
  postingID: { type: Schema.Types.ObjectId },
  authorID: { type: Schema.Types.ObjectId },
  authorName: {
    type: String,
  },
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
})

<<<<<<< HEAD
export default mongoose.model("Comment", commentSchema)
=======
export default mongoose.model("Comment", commentSchema);
>>>>>>> postings
