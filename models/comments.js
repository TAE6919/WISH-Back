import mongoose from 'mongoose';

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
  },
});

const Comment = mongoose.model('Comment', commentSchema);
export default { Comment };
