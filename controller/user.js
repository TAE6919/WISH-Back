import { Content } from '../models/postings.js';
export const getUserProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const userContents = await Content.find({ authorID: userId });
    res.status(200).json({ userContents });
  } catch (error) {
    console.error(error), res.sendStatus(400);
  }
};
