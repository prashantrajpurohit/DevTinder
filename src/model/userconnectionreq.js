const mongoose = require("mongoose");

const connectionreqschema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
    },
    toUserId: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,

      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect type`,
      },
    },
  },
  { timestamps: true }
);
//compund index
//read about indexes advantages disadvantages,when and why to create index
connectionreqschema.index({ fromUserId: 1, toUserId: 1 });

connectionreqschema.pre("save", function (next) {
  if (this.toUserId.equals(this.fromUserId)) {
    throw new Error("request can not be sent to yourself");
  }
  next();
});
const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionreqschema
);
module.exports = ConnectionRequest;
