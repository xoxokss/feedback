import express, { Request, Response, NextFunction, Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";
const saltRounds = 10;

const SECRETKEY = "sangseon";

const userController = {
  //회원가입
  signup: async (req: Request, res: Response) => {
    const { userId, email, password, nickname } = req.body;
    try {
      //비밀번호 암호화
      const encryptPassword = bcrypt.hashSync(password, saltRounds);
      const data = {
        username: userId,
        email: email,
        nickname: nickname,
        password: encryptPassword,
      };
      //DB에 유저정보 create
      await prisma.user.create({
        data: data,
      });
      //response
      res.send({
        data: "success",
      });
    } catch (error) {
      console.log(error);
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  },
  //로그인
  login: async (req: Request, res: Response) => {
    const { userId, password } = req.body;
    try {
      //DB에서 유저 정보 찾기
      const user = await prisma.user.findUnique({
        where: {
          username: userId,
        },
      });
      //비밀번호 복호화 매치
      const match = bcrypt.compareSync(password, user?.password ?? "");
      if (!match) {
        return res.status(400).send({ error: "로그인 정보를 확인하세요" });
      }
      //토큰 발행
      const token = jwt.sign({ userId: user?.username }, SECRETKEY, {
        expiresIn: "24h",
      });
      //response
      res.status(200).send({ message: "로그인 성공", token });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: "로그인 정보를 확인하세요",
      });
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  },
  //아이디 중복검사
  confirmId: async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          username: userId,
        },
      });
      if (user) {
        res.send({
          data: "fail",
        });
      } else {
        res.send({
          data: "success",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: "로그인 정보를 확인하세요",
      });
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  },
  //닉네임 중복검사
  confirmNick: async (req: Request, res: Response) => {
    try {
      const { nickname } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          nickname: nickname,
        },
      });
      if (user) {
        res.send({
          data: "fail",
        });
      } else {
        res.send({
          data: "success",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: "로그인 정보를 확인하세요",
      });
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  },

  //유저 정보
  userInfo: async (req: Request, res: Response) => {
    const { user } = res.locals;
    try {
      return res.status(200).send({ message: "hi", userId: user.username });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: "로그인 정보를 확인하세요",
      });
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  },
  kakaoLogin: async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      'kakao',
      { failureRedirect: '/'},(err, user, info) => {
      if (err) return next(err);
        const {email} = user;
        console.log("리다이렉트 :",user)
        const token = jwt.sign({email}, SECRETKEY,{expiresIn: "24h"});
        res.redirect(`http://54.180.121.151?token=${token}`)
      }
    )(req,res,next);
  }
}
export default userController;
