const express = require("express");
const connectDb = require("./config/database");
const bcrypt = require("bcrypt");
const User = require("./model/user");
const { validateSignUpData } = require("./utils/validation");
const app = express();
app.use(express.json());
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
      res.send("Login successful");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err);
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
    const ALLOWED_UPDATES = ["photo", "age", "gender", "firstName"];
    const isUpdateAllowed = Object.keys(req.body).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Can not update this");
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after", //this will return updated document by default it will return old doc
      runValidators: true,
    });
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
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
