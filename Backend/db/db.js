const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const dburl =
  "mongodb+srv://admin:root@cluster0.ciln6.mongodb.net/PROJECT?retryWrites=true&w=majority";
let mong = mongoose.connect(
  dburl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

module.exports = mong;
