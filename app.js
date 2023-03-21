const express = require("express")
const cors =  require("cors")
var bodyParser = require('body-parser')
const router = require("./src/Router/index")
const  ErrorHandlerMw = require("./src/Middleware/error-handler.mw")


const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
  }));
app.use(bodyParser.json())
app.use("/api/v1/rapidBasket",router)

app.use(ErrorHandlerMw)



module.exports = app