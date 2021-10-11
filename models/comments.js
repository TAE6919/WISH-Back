import mongoose from "mongoose"

const { Schema } = mongoose

const commentSchema = new Schema({
  authorID: {
    type: String,
  },
  authorName: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
})

const Comment = mongoose.model("Comment", commentSchema)
export default { Comment }
