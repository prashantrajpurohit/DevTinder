const { validateSignUpData } = require("../utils/validation");
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const authrouter = express.Router();

authrouter.post("/signup", async (req, res, next) => {
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
authrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("invalid credential");
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      throw new Error("invalid credential");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("Login successful");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err);
  }
});
authrouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logged out succesfully");
});
module.exports = authrouter;
