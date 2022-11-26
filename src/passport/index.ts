import passport from "passport"
import {Strategy as KakaoStrategy} from "passport-kakao"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import {config as dotenv} from "dotenv";
dotenv();

export class SocialService {
    public static async kakaoLogin(accessToken: string, refreshToken: string, profile: any, done: any) {
        try {
            const {id, username, _json: {kakao_account: {email}}} = profile;
            const user = await prisma.user.findUnique({where: {email, provider: "kakao"}});
            if (user) {
                return done(null, user);
            }
            const newUser = await prisma.user.create({
                data: {
                    email,
                    username: username,
                    provider: "kakao"
                }
            });
            return done(null, newUser);
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }

}