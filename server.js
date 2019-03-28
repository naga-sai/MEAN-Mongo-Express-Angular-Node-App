const express = require("express");
const app = express();
const cors = require("cors");
var jwt = require("jsonwebtoken");
// var config = require('./config');
const routes_user = require("./routes/user");
const routes_post = require("./routes/post");

app.use(cors());

require("./startup/middlewares")(app);

require("./startup/db")();

app.use("/api/user", routes_user);

app.use((req, res, next) => {
  var token =
    req.headers.authtoken || req.body.authtoken || req.params.authtoken;
  jwt.verify(token, "marlabs-secret-key", function(err, decoded) {
    if (err) {
      res.status(403).send({
        err: "Invalid Details",
        isLoggedIn: false
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
});
app.use("/api/post", routes_post);

app.get("/", function(req, res) {
  res.send("Welcome to my application");
});

app.get("/home", function(req, res) {
  res.send("Welcome to home application");
});

app.listen(3000, () => {
  console.log("Server running at localhost : 3000");
});
