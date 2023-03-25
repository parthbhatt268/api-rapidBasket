
const mongoose = require("mongoose")
const dotnev = require("dotenv");
const jwt = require('jsonwebtoken');
const app = require("./app")

dotnev.config({ path: "./.env" });


const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

try {
  await mongoose
  .connect(DB,  { useNewUrlParser: true, useUnifiedTopology: true});
} catch (error) {
  console.log(error);
}



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
