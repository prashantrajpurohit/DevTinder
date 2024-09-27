const express = require("express");
const connectDb = require("./config/database");
const User = require("./model/user");
const app = express();
app.use(express.json());
app.post("/signup", async (req, res, next) => {
  const data = new User(req.body);
  try {
    await data.save();
    res.send("Data added succ");
  } catch (err) {
    res.status(400).send("Something bad happened");
  }
});
//finding user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.find({ email: userEmail });
    if (!user.length) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    console.log(user);

    if (!user.length) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
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
