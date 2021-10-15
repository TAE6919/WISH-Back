import Comment from '../models/comments.js';
import mongoose from 'mongoose';
import { nowDate } from '../library/time.js';
import { logger } from '../logger/logger.js';
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
    .then(res.status(200))
    .catch((error) => {
      logger.error(error),
        res.status(400).json({ message: '댓글 저장 실패했습니다' });
    });
};

//댓글 가져오기
export const getAllComments = async (req, res) => {
  const { postingId } = req.params;
  try {
    const allComments = await Comment.find({ postingID: postingId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ allComments });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: '댓글을 불러오는데 실패했습니다' });
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
    logger.error(error);
    res.status(400).json({ message: '댓글 수정에 실패했습니다' });
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
    logger.error(error);
    res.status(400).json({ message: '댓글 삭제에 실패했습니다' });
  }
};
