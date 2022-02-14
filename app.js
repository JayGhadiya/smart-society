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
app
  .route("/master/admin/add-society")

  .get(function (req, res) {
    res.render("add-society", {});
    res.redirect("/");
  })
  .post(function (req, res) {
    console.log(req.body);
    res.redirect("/master/admin/add-society");
  });

// MANAGE SOCITIES
app
  .route("/master/admin/manage-societies")

  .get(function (req, res) {
    res.render("manage-societies");
  })
  .post(function (req, res) {
    // deltetion of society from the database
  });

// ADMIN LOGIN
app
  .route("/admin/login")

  .get(function (req, res) {
    res.render("admin-login");
  })
  .post(function (req, res) {
    console.log(req.body);
    res.redirect("/admin/profile");
  });

// ADMIN PROFILE
app.get("/admin/profile", function (req, res) {
  res.render("admin-profile");
});

// HANDLE USERS
app.get("/admin/handle-users", function (req, res) {
  res.render("admin-handle-users");
});

// MEETINGS
app
  .route("/admin/meetings")

  .get(function (req, res) {
    res.render("admin-meetings");
  })
  .post(function (req, res) {
    console.log(req.body);
    res.redirect("/admin/meetings");
  });

// CIRCULARS
app
  .route("/admin/circulars")

  .get(function (req, res) {
    res.render("admin-circulars");
  })
  .post(function (req, res) {
    console.log(req.body);
    res.redirect("/admin/circulars");
  });

  // AMENITIES
app
.route("/admin/amenities")

.get(function (req, res) {
  res.render("admin-amenities");
})
.post(function (req, res) {
  console.log(req.body);
  res.redirect("/admin/amenities");
});

app.listen(5000, function () {
  console.log("Server started on port 5000.");
});
