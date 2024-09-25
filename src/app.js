const express = require("express");
const app = express();

app.use("/test", (req, res) => {
  res.send("Hello baby");
});

app.listen(3322);
