import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
  postingID: { type: Schema.Types.ObjectId },
  authorID: { type: Schema.Types.ObjectId },
  authorName: {
    type: String,
  },
  sort: {
    type: Number,
  },
  text: {
    type: String,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Comment', commentSchema);
