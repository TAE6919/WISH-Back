import express from "express";
import { getUserProfile, signup, auth, getMe } from "../controller/user.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateSignUp } from "../middlewares/signupMiddleware.js";

const userRouter = express.Router();

userRouter.route("/").post(validateSignUp, signup);
userRouter.route("/auth").post(auth);

userRouter.get("/me", authMiddleware, getMe);
userRouter.route("/:userId").get(getUserProfile);
export default userRouter;
