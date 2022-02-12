const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("home", {});
});

app.get("/master/admin/add-society", function (req, res) {
  // res.render("master-admin-add-society", {});
  res.render("test", {});
});

app.post("/master/admin/add-society", function (req, res) {
  // console.log(req.body);
  res.redirect("/master/admin/add-society");
});

app.listen(5000, function () {
  console.log("Server started on port 5000 \nAND TEST.EJS IS BEING RENDERED.");
});
