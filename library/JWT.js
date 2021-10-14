import jwt from 'jsonwebtoken';
const SECRET_KEY = 'hanghae-3';

export const jwtToken = (_id) => {
  const token = jwt.sign({ userId: _id }, SECRET_KEY);
  return token;
};
