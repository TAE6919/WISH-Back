const express = require('express');
// const { postSignup, postAuth, getMe } = require() '../controller/userController.js'
// const { authMiddleware } = require() '../middlewares/authMiddleware.js'
// const { validateSignUp } = require() '../middlewares/validMiddleware.js'
const { getUserProfile, registUser } = require('../controller/user.js');
const userRouter = express.Router();

userRouter.route('/').post(registUser);

userRouter.post('/auth');

// 페이지 별로 로그인 검사를 위해 별도 API 준비
userRouter.get('/me');

userRouter.route('/:userId').get(getUserProfile);

module.exports = userRouter;
