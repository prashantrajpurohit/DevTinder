const adminAuth = (req, Res, next) => {
  const token = "xyz";

  const isAuth = token === "xyz";
  if (isAuth) {
    next();
  } else {
    Res.status(401).send("YOU ARE NOT AUTHORIZED PERSON");
  }
};
const userAuth = (req, Res, next) => {
  const token = "xyz0";

  const isAuth = token === "xyz";
  if (isAuth) {
    next();
  } else {
    Res.status(401).send("YOU ARE NOT AUTHORIZED USER");
  }
};

module.exports = { adminAuth, userAuth };
