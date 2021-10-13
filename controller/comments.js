import Comment from '../models/comments.js';
import mongoose from 'mongoose';
import { nowDate } from '../library/time.js';

//댓글 저장하기
export const createComments = (req, res) => {
  const { _id, nick } = req.user;
  const { postingId } = req.params;
  const { text } = req.body;
  const targetComment = new Comment({
    postingID: postingId,
    authorID: _id,
    authorName: nick,
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

//댓글 가져오기
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

//댓글 수정하기
export const editComments = async (req, res) => {
  const { _id } = req.user;
  const { postingId } = req.params;
  const { text } = req.body;
  try {
    await Comment.findOneAndUpdate(
      { postingID: postingId, authorID: _id },
      { text, createdAt: nowDate() }
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

//댓글 삭제하기
export const deleteComments = async (req, res) => {
  const { _id } = req.user;
  const { postingId } = req.params;
  try {
    await Comment.findOneAndRemove({
      postingID: postingId,
      authorID: _id,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};
