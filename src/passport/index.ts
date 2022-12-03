import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { config as dotenv } from "dotenv";
dotenv();

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID!,
        callbackURL: "/api/user/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log("kakao profile", profile);
        try {
          const exUser = await prisma.user.findUnique({
            where: {
              email: profile._json.kakao_account.email,
            },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await prisma.user.create({
              data: {
                username: "kakao_" + profile._json.kakao_account.nickname,
                password: "kakao",
                nickname: profile._json.kakao_account.profile.nickname,
                email: profile._json.kakao_account.email,
              },
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
