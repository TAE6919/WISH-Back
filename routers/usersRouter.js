import express from "express";
// import { postSignup, postAuth, getMe } from '../controller/userController.js';
// import { authMiddleware } from '../middlewares/authMiddleware.js';
// import { validateSignUp } from '../middlewares/validMiddleware.js';
import { getUserProfile } from "../controller/user.js";
const userRouter = express.Router();

userRouter.post("/");
userRouter.post("/auth");

// 페이지 별로 로그인 검사를 위해 별도 API 준비
userRouter.get("/me");

userRouter.route("/:userId").get(getUserProfile);
export default userRouter;
