
import passport from 'passport';
//import { Strategy as KakaoStrategy } from 'passport-kakao';
import KakaoStrategy from 'passport-kakao'.Strategy;
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

module.exports = () => {
    passport.use(
        new KakaoStrategy(
        {
    clientID : process.env.KAKAO_ID,
    callbackURL : process.env.KAKAO_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await prisma.user.findUnique({
        where: {
          snsId: profile.id,
          provider: 'kakao',
        },
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await prisma.user.create({
          data: {
            snsId: profile.id,
            provider: 'kakao',
          },
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
))
}