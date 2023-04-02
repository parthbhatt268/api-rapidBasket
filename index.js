
const mongoose = require("mongoose")
const dotnev = require("dotenv");
const jwt = require('jsonwebtoken');
const app = require("./app")

dotnev.config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB,  { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log(err);
  });



const port = process.env.port;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaght Exception. Shutting Down....");
  server.close(() => {
    process.exit(1);
  });
});


module.exports = stripe