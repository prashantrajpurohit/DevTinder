const express = require("express");
const connectDb = require("./config/database");

const app = express();

const cookieParser = require("cookie-parser");
const authrouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
app.use(express.json());
app.use(cookieParser());
app.use("/", authrouter);
app.use("/", profileRouter);

connectDb()
  .then(() => {
    console.log("CONNECTED to db successfully");

    app.listen(3322, () => {
      console.log("SERVER IS LISTENING TO PORT 3322...");
    });
  })
  .catch((err) => {
    console.log(err);
  });
