import express from 'express';

import {
  getUserProfile,
  signup,
  auth,
  getMe,
  getLogin,
  getSignup,
} from '../controller/user.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validateSignUp } from '../middlewares/signupMiddleware.js';

const userRouter = express.Router();

userRouter.route('/').get(getSignup).post(signup, validateSignUp);
userRouter.route('/auth').get(getLogin).post(auth);

userRouter.get('/me', authMiddleware, getMe);
userRouter.route('/:userId').get(getUserProfile);
export default userRouter;
