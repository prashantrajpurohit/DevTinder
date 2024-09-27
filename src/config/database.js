const mongoose = require("mongoose");
const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://perryrajpurohit0786:prashant2205@dev-tinder-cluster.nxnmx.mongodb.net/devTinder"
  );
};
// we do not connect here because we listen to the port when we connect successfully
// connectDb()
//   .then(() => {
//     console.log("DB CONNECTED SUCCESSFULLY");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
module.exports = connectDb;
