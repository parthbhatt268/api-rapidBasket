const express = require("express")
const userRouter = require("./userRouter")
const menuRouter = require("./menuRouter")

const router = express.Router()

const root_path = "/"

router.use(root_path,userRouter)
router.use(root_path,menuRouter)

module.exports = router