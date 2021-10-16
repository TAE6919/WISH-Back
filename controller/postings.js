import { Content, Like } from "../models/postings.js";
import { jwtToken } from "../library/JWT.js";
import { nowDate } from "../library/time.js";
import { logger } from "../logger/logger.js";
import Comment from "../models/comments.js";
// import db from "mongoose";
import { createTestScheduler } from "@jest/core";
// 게시물 생성(CREATE)
export const postPostings = async (req, res) => {
  // content-type : multipart/form-data 라서 req.body가 이상하게 옴
  // const reqBody = JSON.parse(JSON.stringify(req.body));
  const { imageUrl } = req.imageUrl;
  const { text } = req.body;
  const { _id, nick } = req.user;
  const [toDate] = new Date(nowDate()).toISOString().split("T");

  try {
    const sortNumber = await Content.count();

    // 사용자 조회 - nick을 가져오기 위해 필요
    // const user = await User.findById(userId);
    const posting = {
      authorID: _id,
      sort: sortNumber + 1,
      authorName: nick,
      imageUrl,
      text,
      createdAt: toDate,
    };

    await Content.create(posting);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "게시물 생성 실패하였습니다." });
  }
};

// 게시물 전체 조회(READ ALL)
export const getAllPostings = async (req, res) => {
  const { _id, nick } = req.user;
  if (!_id) {
    try {
      const postings = await Content.find({}).sort({ sort: -1 }).lean();
      const newArray = postings.map((firstArray) => {
        firstArray.likeStatus = false;
        return firstArray;
      });
      return res.status(200).json({ newArray });
    } catch (error) {
      logger.error(error);
      return res
        .status(400)
        .send({ message: "전체 게시물 조회 실패하였습니다." });
    }
  }
  try {
    const stringID = _id.toString();
    console.log(stringID);
    const postings = await Content.find({}).sort({ sort: -1 }).lean();

    const newArray = postings.map((firstArray) => {
      if (firstArray.Like.length == 0) {
        firstArray.likeStatus = false;
      } else {
        for (let i = 0; i < firstArray.Like.length; i++) {
          // 하나라도 매치되는 것이 있으면 있으면 True!
          if (firstArray.Like[i]._id.toString().match(stringID)) {
            firstArray.likeStatus = true;
            return firstArray;
          } else if (
            firstArray.Like[i]._id.toString().match(stringID) == null
          ) {
            firstArray.likeStatus = false;
          }
        }
      }
      return firstArray;
    });

    return res.status(200).json({ newArray });
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .send({ message: "전체 게시물 조회 실패하였습니다." });
  }
};

//특정 게시물 조회 (READ ONE)
export const getOnePosting = async (req, res) => {
  const { postingId } = req.params;

  try {
    const posting = await Content.findById(postingId);
    return res.status(200).json(posting);
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .send({ message: "해당 게시물 조회에 실패했습니다." });
  }
};

// 특정 게시물의 일부 속성 수정
export const patchPosting = async (req, res) => {
  const [toDate] = new Date(nowDate()).toISOString().split("T");
  const { postingId } = req.params;
  const { _id } = req.user;
  const { text } = req.body;
  // const { userId } = req.user;

  try {
    const posting = await Content.findById(postingId);
    // 토큰 id랑 해당 게시물의 작성자 id 비교
    if (!posting.authorID.equals(_id)) {
      console.log("사용자 일치하지 않음");
      return res
        .status(400)
        .send({ message: "본인의 게시물만 수정할 수 있습니다." });
    }
    posting.createdAt = toDate;
    posting.text = text;

    await posting.save();
    // await Content.findByIdAndUpdate(postingId, {
    //   $set: { imageUrl, title, text },
    // });

    return res.sendStatus(200);
  } catch (err) {
    logger.error(err);
    return res.sendStatus(400);
  }
};

// 특정 게시물을 삭제
export const deletePosting = async (req, res) => {
  const { postingId } = req.params;
  const { _id } = req.user;

  try {
    const posting = await Content.findById(postingId);
    if (!posting.authorID.equals(_id)) return res.sendStatus(400);

    // const posting = await Content.findByIdAndDelete(postingId);
    await Content.deleteOne(posting);
    return res.sendStatus(200);
  } catch (err) {
    logger.error(err);
    return res.status(400).send({ message: "게시물 삭제 실패했습니다." });
  }
};

//좋아요
export const postLike = async (req, res) => {
  const { postingId } = req.params;
  const { _id } = req.user;

  try {
    // 해당 사용자가 좋아요를 눌렀는지 확인
    const posting = await Content.findById(postingId);

    //해당 포스팅의 Like 배열 likedUser 속성이 userId랑 같은 것이 있는지 찾는다.
    const result = await Content.find({
      $and: [
        { _id: postingId },
        {
          Like: {
            $elemMatch: { _id },
          },
        },
      ],
    });

    if (result.length === 0) {
      await Content.updateOne(posting, {
        $push: {
          Like: { _id },
        },
      });
      let nowLike = await Content.findById(postingId).lean();
      nowLike.likeStatus = true;

      return res.status(200).send({ nowLike });
    } else {
      await Content.updateOne(posting, {
        $pull: {
          Like: { _id },
        },
      });
      let nowLike = await Content.findById(postingId).lean();
      nowLike.likeStatus = false;

      return res.status(200).send({ nowLike });
    }

    // 좋아요 표시할 땐 배열 길이를 찍으면 됨.
  } catch (err) {
    logger.error(err);
    return res.status(400).send({ message: "좋아요 실패했습니다." });
  }
};
