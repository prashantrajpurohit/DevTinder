const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditData } = require("../utils/validation");

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateEditData(req);
    const { user } = req;
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();
    res.json({ message: "Profile updated successfully", data: user });
  } catch (err) {
    res.status(400).send(`${err}`);
  }
});
profileRouter.get("/profile", userAuth, async (req, res) => {
  console.log(req.user);

  const { user } = req;
  res.json({ data: user });
});
module.exports = profileRouter;
