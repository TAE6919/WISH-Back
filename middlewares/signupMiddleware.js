import signUpSchema from '../validations/signup.js';
import { logger } from '../logger/logger.js';
export const validateSignUp = async (req, res, next) => {
  const { nick, email, password, confirmPassword } = req.body;

  try {
    //회원가입 절차일때만 서로 포함하는지 확인
    if (nick && confirmPassword) {
      // nick, password 서로 포함 여부
      const isIncluded = nick.includes(password) || password.includes(nick);
      if (isIncluded)
        return res
          .status(400)
          .send({ msg: '닉네임 과 패스워드에 중복이 있습니다.' });
    }

    const value = await signUpSchema.validateAsync({
      nick,
      email,
      password,
      confirmPassword,
    });
    console.log(value);
    next();
  } catch (error) {
    console.log(error);
    logger.error(error);
    return res.status(400).send({ message: '양식을 확인하세요.' });
  }
};
