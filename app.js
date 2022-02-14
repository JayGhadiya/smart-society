const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const multer = require("multer");

// SETTING UP FILENAME AND DESTINATION
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // rejects a file based on the file type "mimetype"
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(
      null,
      console.error('worng file format! you uploaded "' + file.mimetype + '"'),
      false
    );
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, //5 megabyte
});
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
    console.log(req.file.mimetype);
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
  .post(upload.single("image"), function (req, res) {
    res.redirect("/admin/amenities");
  });

app.listen(5000, function () {
  console.log("Server started on port 5000.");
});
