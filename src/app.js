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
app.get("/user/:id", async (req, res) => {
  const userid = req.params.id;
  try {
    const user = await User.findById(userid);
    console.log(user);

    if (!user) {
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

//create delete api here on your own
app.delete("/user/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("User Deleted Successfully");
  } catch (err) {
    console.log(err);
  }
});
//find the diff btw PATCH and PUT
app.patch("/user/edit/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after", //this will return updated document by default it will return old doc
    });
    res.send(user);
  } catch (err) {}
});
app.put("/user/edit/", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      req.body,
      {
        returnDocument: "after", //this will return updated document by default it will return old doc
      }
    );
    res.send(user);
  } catch (err) {}
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
