const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../model/userconnectionreq");
const User = require("../model/user");
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,

  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const { toUserId, status } = req.params;
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "INVALID STATUS TYPE" });
      }
      const toUserIdExists = await User.findById(toUserId);
      if (!toUserIdExists) {
        return res
          .status(400)
          .json({ message: "request can not be sent to non valid user" });
      }
      console.log(fromUserId);

      const existingconnection = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingconnection) {
        return res.status(400).json({
          message:
            "Connection Request can not be sent as it has been sent already",
        });
      }
      const connectionrequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionrequest.save();
      res.json({
        message: "Connection request sent succesfully",
        data,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedinUser = req.user;
      const allowedStatus = ["accepted", "rejected"];
      const { status, requestId } = req.params;
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status is not valid" });
      }
      const foundConnectionReq = await ConnectionRequest.findOne({
        fromUserId: requestId,
        toUserId: loggedinUser._id,
        status: "interested",
      });
      if (!foundConnectionReq) {
        return res.status(404).json({ message: "Connection Req not found" });
      }

      foundConnectionReq.status = status;
      const data = await foundConnectionReq.save();
      res.status(200).json({ message: `Connection req is ${status}`, data });
    } catch (err) {
      res.status(400).send("ERROR :" + err);
    }
  }
);
module.exports = requestRouter;
