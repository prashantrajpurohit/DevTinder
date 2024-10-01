const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
  const { user } = req;
  res.send(user);
});
module.exports = profileRouter;
