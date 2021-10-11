import jwt from "jsonwebtoken"
import User from "../models/users.js"
const SECRET_KET = "hanghae-3"

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers

  const [tokenType, tokenValue] = authorization.split(" ")

  if (tokenType !== "Bearer") return res.status(400).send({ msg: "로그인 후 사용하세요." })
  try {
    const { userId, nickname } = jwt.verify(tokenValue, SECRET_KET)

    const user = await User.findById(userId)
    const nickname = await User.findOne(nickname)

    req.user = { user, nickname }
    next()
  } catch (error) {
    return res.status(400).send({ msg: "로그인이 필요한 기능입니다!" })
  }
}
