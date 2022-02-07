const express = require("express");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("master-admin-add-society", {});
});

app.listen(5000, function () {
  console.log("Server started on port 5000");
});
