import mongoose from "mongoose";

const { Schema } = mongoose;

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
});

export default mongoose.model("Comment", commentSchema);
