const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, Res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("invalid token");
    }
    const { _id } = jwt.verify(token, "perry@!23");
    const user = await User.findById(_id);

    if (user) {
      req.user = user;
      next();
    } else {
      throw new Error("User not found!!");
    }
  } catch (err) {
    Res.status(401).send("error");
  }
};

module.exports = { userAuth };
