const express = require("express")
const userRouter = require("./userRouter")
const menuRouter = require("./menuRouter")
const {authControllerProtected} = require('../Middleware/Authenticate')

const router = express.Router()

const root_path = "/"

router.use(root_path,userRouter)
router.use(authControllerProtected) //Yaha rakha hai boz Lgin and Register ko tken se verify nai karvana
router.use(root_path,menuRouter)

module.exports = router