const express = require("express")
const userRouter = require("./userRouter")
const menuRouter = require("./menuRouter")
const {authControllerProtected} = require('../Middleware/Authenticate')
const profileRouter = require("./profileRouter")
const orderRouter = require("./orderRouter")
const orderHistoryRouter = require("./orderHistoryRouter")
const feedbackRouter = require("./feedbackRouter")
const router = express.Router()

const root_path = "/"

router.use(root_path,userRouter)
router.use(authControllerProtected) //Yaha rakha hai boz Lgin and Register ko tken se verify nai karvana
router.use(root_path,profileRouter)
router.use(root_path,menuRouter)
router.use(root_path,orderRouter)
router.use(root_path,orderHistoryRouter)
router.use(root_path, feedbackRouter)



module.exports = router