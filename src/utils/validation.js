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
const validateEditData = (req) => {
  const allowedFieldsForEdit = ["firstName", "lastName", "skills"];
  const isAllowed = Object.keys(req.body).every((field) =>
    allowedFieldsForEdit.includes(field)
  );
  if (!isAllowed) {
    throw new Error("invalid edit request");
  }
};

module.exports = { validateSignUpData, validateEditData };
