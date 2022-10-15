import express, { Request, Response, NextFunction, Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;

const UserController = {
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
      //DB에 유저정보 crete
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
      const token = jwt.sign({ userId: user?.username }, "sangseon", {
        expiresIn: "24h",
      });
      //response
      res.status(200).send({ message: "로그인 성공", token });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: "로그인 정보를 확인하세요",
      });
    }
  },
  userInfo: async (req: Request, res: Response) => {
    const { user } = res.locals;
    try {
      return res.status(200).send({message:"hi",
        userId: user.username,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: "로그인 정보를 확인하세요",
      });
    }
  },
};
export { UserController };