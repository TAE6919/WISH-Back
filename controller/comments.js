import Comment from '../models/comments.js';
import mongoose from 'mongoose';
import { nowDate } from '../library/time.js';
const postobjectId = mongoose.Types.ObjectId('55153a8014829a865bbf700f');
const userobjectId = mongoose.Types.ObjectId('55153a1231222b865bbf700e');

export const createComments = (req, res) => {
  const { postingId } = req.params;
  const { text } = req.body;
  const targetComment = new Comment({
    postingID: postobjectId,
    authorID: userobjectId,
    authorName: '김기태',
    text,
    createdAt: nowDate(),
  });
  targetComment
    .save()
    .then(res.sendStatus(200))
    .catch((error) => {
      console.error(error), res.sendStatus(400);
    });
};

export const getAllComments = async (req, res) => {
  const { postingId } = req.params;
  try {
    await Comment.find({ postingID: postingId });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const editComments = async (req, res) => {
  const { postingId } = req.params;
  const { text } = req.body;
  try {
    await Comment.findOneAndUpdate(
      { postingID: postingId, authorID: userobjectId },
      { text }
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const deleteComments = async (req, res) => {
  const { postingId } = req.params;
  try {
    await Comment.findOneAndRemove({
      postingID: postingId,
      authorID: userobjectId,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};
