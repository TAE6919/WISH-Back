import mongoose from "mongoose";

const { Schema } = mongoose;

const likeSchema = new Schema({
  _id: Schema.Types.ObjectId,
});

const contentSchema = new Schema({
  authorID: { type: Schema.Types.ObjectId },

  sort: {
    type: Number,
  },

  authorName: {
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
    type: String,
  },

  Like: [likeSchema],
});
const Like = mongoose.model("Like", likeSchema);
const Content = mongoose.model("Content", contentSchema);
export { Content, Like };
