import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { config as dotenv } from "dotenv";
dotenv();
import jwt from "jsonwebtoken";
const SECRETKEY = "sangseon";

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID!,
        callbackURL: "http://localhost:8000/api/user/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await prisma.user.findUnique({
            where: {
              email: profile._json.kakao_account.email,
            },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const data = {
              username: profile._json.id.toString(),
              nickname: profile._json.kakao_account.profile.nickname,
              email: profile._json.kakao_account.email,
              // provider: "kakao",
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
