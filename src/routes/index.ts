import express from "express"

const router = express.Router()

router.get('/', function (req,res) {
    res.send('api페이지')
})


export {router}
