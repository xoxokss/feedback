import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { Request, Response, NextFunction } from "express";

declare module "jsonwebtoken" {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    username: string;
  }
}

const authMiddleware = async (req: Request, res: Response, next: any) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = (authorization || "").split(" ");
  if (!tokenValue || tokenType !== "Bearer") {
    res.send({
      errorMessage: "로그인이 필요한 페이지 입니다. (토큰 에러)",
    });
    return;
  }
  try {
    const { userId } = <jwt.UserIDJwtPayload>jwt.verify(tokenValue, "sangseon");
    console.log("JWT 인증 미들웨어를 거치고 갔습니다.");
    const user = await prisma.user.findUnique({
      where: { username: userId },
    });
    res.locals.user = user;
    next();
  } catch (error) {
    // 토큰이 없거나, 유효하지 않은 토큰인 경우 이쪽으로 접근.
    console.log(error);
    res.status(401).send({
      errorMessage: "로그인이 필요한 페이지 입니다.(에러)",
    });
    return;
  }
};

export { authMiddleware };
