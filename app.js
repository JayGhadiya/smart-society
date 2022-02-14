const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// HOME PAGE
app.get("/", function (req, res) {
  res.render("home", {});
});

// ADD A SOCIETY
app.get("/master/admin/add-society", function (req, res) {
  res.render("add-society", {});
  res.redirect("/");
});

app.post("/master/admin/add-society", function (req, res) {
  res.redirect("/master/admin/add-society");
});

// MANAGE SOCITIES
app.get("/master/admin/manage-societies", function (req, res) {
  res.render("manage-societies");
});

app.post("/master/admin/manage-societies", function (req, res) {
  // deltetion of society from the database
});

// ADMIN LOGIN
app.get("/admin/login", function (req, res) {
  res.render("admin-login");
});

app.post("/admin/login", function (req, res) {
  console.log(req.body);
  res.redirect("/admin/profile");
});

// ADMIN PROFILE
app.get("/admin/profile", function (req, res) {
  res.render("admin-profile");
});

app.listen(5000, function () {
  console.log("Server started on port 5000.");
});
