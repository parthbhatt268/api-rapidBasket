const express = require("express")
const cors =  require("cors")
var bodyParser = require('body-parser')
const userRouter = require("./src/Router/userRouter")
const  ErrorHandlerMw = require("./src/Middleware/error-handler.mw")


const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(bodyParser.json())

app.use(userRouter)
app.use(ErrorHandlerMw)



module.exports = app