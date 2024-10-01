const express = require("express");
const connectDb = require("./config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./model/user");

const { validateSignUpData } = require("./utils/validation");
const app = express();

const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res, next) => {
  //read bcrypt docs
  const { firstName, lastName, password, email } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const data = new User({
    firstName,
    lastName,
    email,
    password: passwordHash,
  });

  try {
    validateSignUpData(req);
    await data.save();
    res.send("Data added succ");
  } catch (err) {
    res.status(400).send("ERROR : " + err);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("invalid credential");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new Error("invalid credential");
    } else {
      const token = await jwt.sign({ _id: user._id }, "perry@!23");

      res.cookie("token", token);
      res.send("Login successful");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  const { user } = req;
  res.send(user);
});

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
