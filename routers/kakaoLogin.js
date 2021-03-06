import express from 'express';
import User from '../models/users.js';
const kakaoLoginRouter = express.Router();
import passport from 'passport';
import kakaoPassport from 'passport-kakao';
import { logger } from '../logger/logger.js';
const KakaoStrategy = kakaoPassport.Strategy;

passport.serializeUser((user, done) => {
  // Strategy 성공 시 호출됨
  const { _id, nick } = user;
  console.log('ser');
  done(null, { _id, nick }); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
});

passport.deserializeUser(async (user, done) => {
  // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
  const { _id, nick } = user;
  const nowUser = await User.findById({ _id });
  console.log('dese');
  const nowUserEmailNick = {
    _id: nowUser._id,
    nick: nowUser.nick,
  };
  done(null, nowUserEmailNick); // 여기의 user가 req.user가 됨
});

passport.use(
  'kakao',
  new KakaoStrategy(
    {
      clientID: 'c5b22a4795f62ae5790a2f735f2f0ffc',
      callbackURL: 'http://3.35.235.79/kakao/oauth',
    },
    async function (accessToken, refreshToken, profile, done) {
      const { username } = profile;
      const { email } = profile._json.kakao_account;

      try {
        const user = await User.findOne({ email });

        if (!user) {
          const newUser = await User.create({
            email,
            nick: username,
            isKaKao: true,
          });
          return done(null, newUser);
        } else {
          return done(null, user);
        }
      } catch (error) {
        logger.error(error);
      }
    }
  )
);

kakaoLoginRouter.get('/', passport.authenticate('kakao'));
kakaoLoginRouter.get(
  '/oauth',
  passport.authenticate('kakao', {
    failureRedirect:
      'http://kbumsoo.s3-website.ap-northeast-2.amazonaws.com/login', // 로그인에 실패했을 경우 해당 라우터로 이동한다
  }),
  (req, res) => {
    // 로그인에 성공했을 경우, 다음 라우터가 실행된다

    res.redirect(
      'http://kbumsoo.s3-website.ap-northeast-2.amazonaws.com/kakao?hi=1'
    );
  }
);

export default kakaoLoginRouter;
