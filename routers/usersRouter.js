import express from "express"
import { signup, auth, getMe } from "../controller/user.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const userRouter = express.Router()

userRouter.post("/", signup)
userRouter.post("/auth", auth)

// 페이지 별로 로그인 검사를 위해 별도 API 준비
userRouter.get("/me", authMiddleware, getMe)
export default userRouter
