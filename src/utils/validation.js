const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("First and Last name is required!!!");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid!!!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not valid!!!");
  }
};

module.exports = { validateSignUpData };
