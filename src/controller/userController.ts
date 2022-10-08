import express, { Request, Response, NextFunction, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const signup = async (req: Request, res: Response) => {
  const { userid, email, password, nickname} =
    req.body;
  try {
    const data = {
      USERNAME: userid,
      EMAIL: email,
      NICKNAME: nickname,
      PASSWORD: password
    };

    await prisma.user.create({
      data: data,
    });

    res.send({
        data : "success"
    })
  } catch (err) {
    console.log(err);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
};
const login = async (req: Request, res: Response) => {
  try {
  } catch {}
};
export default { signup, login };
