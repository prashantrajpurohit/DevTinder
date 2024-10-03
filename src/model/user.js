const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email");
        }
      },
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      // enum: {
      //   values: ["male", "female", "other"],
      //   message: `{VALUE} is not a valid gender`,
      // },

      // validators by default work for new user means POST api to make then work on PUT/PATCH api we use runvalidator in options
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gneder is no valid");
        }
      },
    },
    photo: {
      type: String,
      default: "someurl",
    },
  },
  { timestamps: true }
);

//SCHEMA METHODS
userSchema.methods.getJWT = async function () {
  const token = await jwt.sign({ _id: this._id }, "perry@!23", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  const isPasswordMatched = await bcrypt.compare(password, this.password);
  return isPasswordMatched;
};

// const User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
