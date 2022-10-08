import express from "express"
const router = express.Router()

import { userRouter } from "./user";

router.get('/', function (req,res) {
    res.send('api페이지')
})

router.use(`/user`, [userRouter]);

export default router
