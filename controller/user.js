import User from '../models/users.js';
import bcrypt from 'bcrypt';
import { jwtToken } from '../library/JWT.js';
import { Content } from '../models/postings.js';

// export const getSignup = (req, res) => {

//   return res.render("signup")
// }


// export const getLogin = (req, res) => {
//   return res.render("login")
// }

export const signup = async (req, res) => {
  const { nick, email, password, confirmPassword } = req.body

  if (password !== confirmPassword)
    return res.status(400).send({ result: "failure", msg: "비밀번호가 일치하지 않습니다." })

  try {
    const isExisting = await User.find({ $or: [{ nick }, { email }] })
    if (isExisting.length)
      return res.status(400).send({
        result: "failure",
        msg: "이미 가입한 닉네임 또는 이메일이 있습니다.",
      })

    const hashedPassword = await bcrypt.hash(password, 5)

    const newUser = {
      nick,
      email,
      password: hashedPassword,
    }

    await User.create(newUser)

    return res.status(200).send({ result: "success", msg: "회원가입에 성공하였습니다." })
  } catch (error) {
    console.log(error)
    return res.status(400).send({ result: "failure", msg: "DB 정보 조회 실패" })
  }
}

export const auth = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(400).send({ result: "falure", msg: "존재하지 않는 회원입니다." })

  const isPwMatched = await bcrypt.compare(password, user.password)

  if (!isPwMatched)

    return res
      .status(400)
      .send({ result: 'failure', msg: '비밀번호가 일치하지 않습니다.' });
  const { _id } = user;
  const token = jwtToken(_id);
  return res.status(200).send({ result: 'success', msg: '로그인 완료', token });
};


export const getMe = async (req, res) => {
  const userId = req.user._id
  return res.status(200).send({
    userId,

  })
}


export const getUserProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const userContents = await Content.find({ authorID: userId });
    res.status(200).json({ userContents });
  } catch (error) {
    console.error(error), res.sendStatus(400);
  }
};

