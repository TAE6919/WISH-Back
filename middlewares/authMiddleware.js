import jwt from 'jsonwebtoken';
import { logger } from '../logger/logger.js';
import User from '../models/users.js';
const SECRET_KET = 'hanghae-3';

export const authMiddleware = async (req, res, next) => {
  // 카카오 로그인일 경우 바로 다음 콜백으로 넘기기
  if (req.session.passport) {
    next();
    return;
  }
  const { authorization } = req.headers;

  // 로그인 안 하면 authorization 없음
  if (!authorization) return res.status(400).send();

  const [tokenType, tokenValue] = authorization.split(' ');
  if (tokenType !== 'Bearer') {
    logger.error('로그인 후 사용하세요');
    return res.status(400).send({ msg: '로그인 후 사용하세요.' });
  }

  try {
    const { userId } = jwt.verify(tokenValue, SECRET_KET);
    const user = await User.findById(userId);
    req.user = user;
    next();
  } catch (error) {
    logger.error('로그인이 필요한 기능입니다!');
    return res.status(400).send({ msg: '로그인이 필요한 기능입니다!' });
  }
};
