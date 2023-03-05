const express = require("express")
const cors =  require("cors")
var bodyParser = require('body-parser')
const router = require("./src/Router/index")
const  ErrorHandlerMw = require("./src/Middleware/error-handler.mw")


const app = express()

app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });
app.use(express.json())
app.use(express.urlencoded())
app.use(bodyParser.json())
app.use("/api/v1/rapidBasket",router)

app.use(ErrorHandlerMw)



module.exports = app