const mongoose = require("mongoose");
const validator = require("validator");
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
      //validators by default work for new user means POST api to make then work on PUT/PATCH api we use runvalidator in options
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

// const User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
