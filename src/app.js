const express = require("express");
const { adminAuth, userAuth } = require("../middlewares/auth");
const app = express();
//THIS IS MIDDLE WARE we are using use because we wan to chck all get put patch post delete api that they have token or not
app.use("/admin", adminAuth);
//
app.get("/user", userAuth, (req, res) => res.send("HELLO FROM USER"));
app.get("/admin/allData", (req, res) => {
  res.send("ADMIN ALL DATA");
});
app.get("/admin/deleteUser", (Req, res) => {
  res.send("DELTED USER");
});
app.listen(3322);
