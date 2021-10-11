import mongoose from 'mongoose';

const { Schema } = mongoose;

const likeSchema = new Schema({
  likedUser: { type: Schema.Types.ObjectId },
});

const contentSchema = new Schema({
  authorID: { type: Schema.Types.ObjectId },

  authorName: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  text: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  Like: [likeSchema],
});
const Content = mongoose.model('Content', contentSchema);
const Like = mongoose.model('Like', likeSchema);
export { Content, Like };
