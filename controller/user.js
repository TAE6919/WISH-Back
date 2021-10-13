import { Content } from '../models/postings.js';

//user의 profile을 가져오기
export const getUserProfile = async (req, res) => {
  console.log(req.user);
  const { userId } = req.params;
  try {
    const userContents = await Content.find({ authorID: userId });
    res.status(200).json({ userContents });
  } catch (error) {
    console.error(error), res.sendStatus(400);
  }
};
