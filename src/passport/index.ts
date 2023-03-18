import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import 'dotenv/config';

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID!,
        callbackURL: 'http://54.180.121.151:8000/api/user/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await prisma.user.findUnique({
            where: {
              username: profile._json.id.toString(),
            },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const data = {
              username: profile._json.id.toString(),
              nickname: profile._json.kakao_account.profile.nickname,
              email: profile._json.kakao_account.email,
              provider: 'kakao',
            };
            const newUser = await prisma.user.create({
              data: data,
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user!);
  });
};
