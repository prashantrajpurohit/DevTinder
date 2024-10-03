const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../model/userconnectionreq");
const express = require("express");
const userRouter = express.Router();
const toExtractFormRef = "firstName lastName";
userRouter.get("/request/review/recieved", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user._id;
    const recievedconnection = await ConnectionRequest.find({
      toUserId: loggedinUser,
      status: "accepted",
    })
      // .populate("fromUserId", ["firstName", "lastName"]);//both ways are correct
      .populate("fromUserId", "firstName lastName age gender skills photo");
    res
      .status(200)
      .json({ message: "Fetched successfully", data: recievedconnection });
  } catch (err) {
    res.status(400).send("Err :" + err);
  }
});
userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user._id;
    const allUserConnection = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedinUser }, { toUserId: loggedinUser }],
      status: "accepted",
    })
      .populate("fromUserId", toExtractFormRef)
      .populate("toUserId", toExtractFormRef);
    console.log(allUserConnection);
    const data = allUserConnection.map((item) => {
      if (item.fromUserId._id.toString() === loggedinUser.toString()) {
        return item.toUserId;
      }
      return item.fromUserId;
    });
    res.status(200).json({ message: "All Connection req", data: data });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});
module.exports = userRouter;
