import User from "../models/users.js";
import { Content, Like } from "../models/postings.js";
import mongoose from "mongoose";
// 게시물 생성(CREATE)

export const postPostings = async (req, res) => {
  const { title, imageUrl, text } = req.body;
  // const { userId } = req.cookies;

  try {
    // 사용자 조회 - nick을 가져오기 위해 필요
    // const user = await User.findById(userId);

    const posting = {
      authorID: mongoose.Types.ObjectId(429490000),
      authorName: "asdfsdfsa",
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
  const { imageUrl, title, text } = req.body;

  try {
    await Content.findByIdAndUpdate(postingId, {
      $set: { imageUrl, title, text },
    });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

// 특정 게시물을 삭제
export const deletePosting = async (req, res) => {
  // const { postingId } = req.params;
  const postingId = mongoose.Types.ObjectId("6163f627fd74d1cbe34d8f0b");
  try {
    await Content.findByIdAndDelete(postingId);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res, sendStatus(400);
  }
};

export const postLike = async (req, res) => {
  const { postingId } = req.params;
  const { userId } = req.cookies;

  try {
    // 해당 사용자가 좋아요를 눌렀는지 확인
    const posting = await Content.findById(postingId);
    posting.Like.forEach((user) => {
      //userId로 사용자 검색
      if (user.likedUser === userId) {
        // 사용자가 있으면 배열에서 빼고
        await posting.updateOne(posting, {
          $pull: { Like: { LikedUser: userId } },
        });
      } else {
        // 아니면 배열에 사용자 id를 push
        await posting.updateOne(posting, {
          $push: { Like: { LikedUser: userId } },
        });
      }
    });
    // 좋아요 표시할 땐 배열 길이를 찍으면 됨.
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
