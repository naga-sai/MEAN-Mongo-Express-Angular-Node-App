const mongoose = require("mongoose");

module.exports = function() {
  // Connect to Database
  mongoose
    .connect(
      "mongodb://localhost:27017/marlabs",
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("Database Connected!!!");
    })
    .catch(err => {
      console.log(err);
    });
};
