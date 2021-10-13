import express from 'express';
import KakaoUser from '../models/kakaoUser.js';
const kakaoLoginRouter = express.Router();
import passport from 'passport';
import kakaoPassport from 'passport-kakao';

const KakaoStrategy = kakaoPassport.Strategy;

passport.serializeUser((user, done) => {
  // Strategy 성공 시 호출됨
  const { id } = user;
  done(null, id); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
});

passport.deserializeUser(async (id, done) => {
  // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
  const user = await KakaoUser.findOne({ id });

  done(null, user); // 여기의 user가 req.user가 됨
});

passport.use(
  'kakao',
  new KakaoStrategy(
    {
      clientID: 'c5b22a4795f62ae5790a2f735f2f0ffc',
      callbackURL: 'http://localhost:4000/kakao/oauth',
    },
    async function (accessToken, refreshToken, profile, done) {
      const { id, username } = profile;
      try {
        const user = await KakaoUser.findOne({ id });
        if (!user) {
          const newUser = await KakaoUser.create({ id, nick: username });
          return done(null, newUser);
        } else {
          return done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

kakaoLoginRouter.get('/', passport.authenticate('kakao'));
kakaoLoginRouter.get(
  '/oauth',
  passport.authenticate('kakao', {
    failureRedirect: '/login', // 로그인에 실패했을 경우 해당 라우터로 이동한다
  }),
  (req, res) => {
    // 로그인에 성공했을 경우, 다음 라우터가 실행된다
    res.redirect('/');
  }
);

export default kakaoLoginRouter;
