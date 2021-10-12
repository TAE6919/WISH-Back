import { Content, Like } from "../models/postings.js";
import mongoose from "mongoose";
import { nowDate } from "../library/time.js";

//테스트용
const userId = mongoose.Types.ObjectId("c1f93bc87aa222bd5bb7a4eb");
const temp = mongoose.Types.ObjectId("c2f93bc87aa222bd5bb7a4e2");
const nick = "John Doe";
// const postingId = mongoose.Types.ObjectId("6163f627fd74d1cbe34d8f0b");

// 게시물 생성(CREATE)
export const postPostings = async (req, res) => {
  const { title, imageUrl, text } = req.body;
  // const { userId } = req.user;

  try {
    // 사용자 조회 - nick을 가져오기 위해 필요
    // const user = await User.findById(userId);

    const posting = {
      authorID: userId,
      authorName: nick,
      imageUrl,
      title,
      text,
      createdAt: nowDate(),
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
  console.log(req.body);
  console.log(req.params);
  const { imageUrl, title, text } = req.body;
  // const { userId } = req.user;

  try {
    const posting = await Content.findById(postingId);
    // 토큰 id랑 해당 게시물의 작성자 id 비교
    if (!posting.authorID.equals(userId)) {
      console.log("사용자 일치하지 않음");
      return res.sendStatus(400);
    }

    posting.imageUrl = imageUrl;
    posting.title = title;
    posting.text = text;

    await posting.save();
    // await Content.findByIdAndUpdate(postingId, {
    //   $set: { imageUrl, title, text },
    // });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

// 특정 게시물을 삭제
export const deletePosting = async (req, res) => {
  const { postingId } = req.params;
  // const userId = req.user;

  try {
    const posting = await Content.findById(postingId);

    if (posting.authorID.equals(userId)) return res.sendStatus(400);
    // const posting = await Content.findByIdAndDelete(postingId);
    await Content.deleteOne(posting);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res, sendStatus(400);
  }
};

//좋아요
export const postLike = async (req, res) => {
  const { postingId } = req.params;
  // const { userId } = req.user;

  try {
    // 해당 사용자가 좋아요를 눌렀는지 확인
    const posting = await Content.findById(postingId);

    //해당 포스팅의 Like 배열 likedUser 속성이 userId랑 같은 것이 있는지 찾는다.
    const result = await Content.find({
      $and: [
        { _id: postingId },
        {
          Like: {
            $elemMatch: { likedUser: userId },
          },
        },
      ],
    });

    if (result.length === 0) {
      await Content.updateOne(posting, {
        $push: {
          Like: { likedUser: userId },
        },
      });
    } else {
      await Content.updateOne(posting, {
        $pull: {
          Like: { likedUser: userId },
        },
      });
    }

    // 좋아요 표시할 땐 배열 길이를 찍으면 됨.
    const likeCount = posting.Like.length;
    return res.status(200).send({ posting, likeCount });
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
