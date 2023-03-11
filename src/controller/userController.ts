import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";
import sendGmail from "~/utils/helper/mail";
import "dotenv/config";
import { resObj } from "@helper/resObj";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const SECRETKEY: any = process.env.SECRET;

const userController = {
  //회원가입
  signup: async (req: Request, res: Response) => {
    const { userId, email, password, nickname } = req.body;
    try {
      //비밀번호 암호화
      const encryptPassword = bcrypt.hashSync(password, salt);
      const data = {
        userId: userId,
        email: email,
        nickname: nickname,
        password: encryptPassword,
        profileImg: "https://i.imgur.com/9LDfN2H.png",
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
      res
        .status(500)
        .send(resObj.failed({ status: 500, error: "회원가입에 실패했습니다" }));
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
          userId: userId,
        },
      });

      //비밀번호 복호화 매치
      const match = bcrypt.compareSync(password, user?.password ?? "");
      if (!match) {
        return res.status(400).send({ error: "로그인 정보를 확인하세요" });
      }
      //토큰 발행
      const token = jwt.sign({ userId: user?.userId }, SECRETKEY, {
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
          userId: userId,
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
      return res.status(200).send({
        message: "success",
        userId: user.userId,
        nickname: user.nickname,
        email: user.email,
        profileImg: user.profileImg, //user.phone
      });
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

  // Oauth Kakao Login
  kakaoLogin: async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "kakao",
      { failureRedirect: "/" },
      (err, user, info) => {
        if (err) return next(err);
        const token = jwt.sign({ userId: user.userId }, SECRETKEY, {
          expiresIn: "24h",
        });
        res.send({ data: "success", token });
      }
    )(req, res, next);
  },

  verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    try {
      const signNum = Math.random().toString().substring(2, 8);
      const exUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (exUser) {
        return res
          .status(400)
          .send({ success: false, message: "이미 가입된 이메일입니다." });
      }
      const emailParams = {
        to: email,
        subject: "Feedback 이메일 인증번호 발송 메일",
        //text: `인증번호는 ${signNum} 입니다.`,
        html: `<h4>인증번호는</h4> </br> <h1>${signNum}</h1> </br><h4> 입니다.</h4>`,
      };
      if (!exUser) {
        sendGmail(emailParams);
        res.status(200).send({ success: true, data: signNum });
      }
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send({ success: false, error: "이메일 발송에 실패했습니다" });
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    const { user } = res.locals;
    try {
      const exUser = await prisma.user.findUnique({
        where: {
          userId: user.userId,
        },
      });
      if (exUser) {
        await prisma.user.delete({
          where: {
            userId: user.userId,
          },
        });
        res.status(200).send({ message: "유저 삭제 성공" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "유저 삭제 실패" });
    }
  },
  UpdateProfileImg: async (req: Request, res: Response) => {
    try {
      const { user } = res.locals;
      const file = req.file as Express.Multer.File;
      const result = await prisma.user.update({
        where: {
          userId: user.userId,
        },
        data: {
          profileImg: file.path,
          // path로 저장할지, file name 이나 url로 저장해야 되는지
        },
      });
      res.status(200).send(resObj.success({ status: 200, data: result }));
    } catch (err) {
      console.log(err);
      res.status(500).send(resObj.failed({ status: 500, error: err }));
    }
  },
};

export default userController;
