import User from "../models/users.js";
import { Content, Like } from "../models/postings.js";

// 게시물 생성(CREATE)
export const postPostings = async (req, res) => {
  const { title, imageUrl, text } = req.body;
  const { userId } = req.cookies;

  try {
    // 사용자 조회 - nick을 가져오기 위해 필요
    const user = await User.findById(userId);

    const posting = {
      authorID: user._id,
      authorName: user.nick,
      imageUrl,
      title,
      text,
    };

    await Content.create(posting);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

// 게시물 전체 조회(READ ALL)
export const getAllPostings = async (req, res) => {
  try {
    const postings = await Content.find({}).sort({ createdAt: -1 });
    return res.status(200).json(postings);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

//특정 게시물 조회 (READ ONE)
export const getOnePosting = async (req, res) => {
  const { postingId } = req.params;

  try {
    const posting = await Content.findById(postingId);
    return res.status(200).json(posting);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

// 특정 게시물의 일부 속성 수정
export const patchPosting = async (req, res) => {
  const { postingId } = req.params;

  try {
    await Content.findByIdAndUpdate;

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

// 특정 게시물을 삭제
export const deletePosting = async (req, res) => {
  const { postingId } = req.params;

  try {
    await Content.findByIdAndDelete(postingId);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res, sendStatus(400);
  }
};
