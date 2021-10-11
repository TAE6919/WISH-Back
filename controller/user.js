import User from "../models/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SECRET_KEY = "this is my secret key"

export const getSignup = (req, res) => {
  return res.render("signup")
}

export const getLogin = (req, res) => {
  return res.render("login")
}

// User CRUD

export const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body

  // check pw, confirmPw
  if (password !== confirmPassword)
    return res.status(400).send({ result: "failure", msg: "비밀번호가 일치하지 않습니다." })

  try {
    // check duplication in db
    const isExisting = await User.find({ $or: [{ username }, { email }] })
    if (isExisting.length)
      return res.status(400).send({
        result: "failure",
        msg: "이미 가입한 Username 또는 eMail이 있습니다.",
      })

    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 5)

    // create user object
    const newUser = {
      username,
      email,
      password: hashedPassword,
    }

    // create new user data
    await User.create(newUser)

    return res.status(200).send({ result: "success", msg: "회원가입에 성공하였습니다." })
  } catch (error) {
    console.log(error)
    return res.status(400).send({ result: "failure", msg: "DB 정보 조회 실패" })
  }
}

export const auth = async (req, res) => {
  const { email, password } = req.body

  // check if user exists
  const user = await User.findOne({ email })
  if (!user) return res.status(400).send({ result: "falure", msg: "존재하지 않는 회원입니다." })

  // check if pw matches
  const isPwMatched = await bcrypt.compare(password, user.password)
  // return if pw not matches
  if (!isPwMatched)
    return res.status(400).send({ result: "failure", msg: "비밀번호가 일치하지 않습니다." })

  const token = jwt.sign({ userId: user._id, nickname: user.nick }, SECRET_KEY)

  return res.status(200).send({ result: "success", msg: "로그인 완료", token })
}

export const getMe = async (req, res) => {
  const userId = res.locals.user._id
  return res.status(200).send({
    userId,
  })
}
