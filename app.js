const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const multer = require("multer");
const { handle } = require("express/lib/application");
const { stringify } = require("nodemon/lib/utils");

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
  res.render("test-pages/home");
});

// ADD A SOCIETY
app
  .route("/master/admin/add-society")

  .get(function (req, res) {
    res.render("master-admin-pages/master-add-society");
  })
  .post(function (req, res) {
    console.log(req.body);
    res.redirect("/master/admin/add-society");
  });

// MANAGE SOCITIES
app
  .route("/master/admin/manage-societies")

  .get(function (req, res) {
    res.render("master-admin-pages/master-manage-societies");
  })
  .post(function (req, res) {
    // deltetion of society from the database
  });

// ADMIN LOGIN
app
  .route("/admin/login")

  .get(function (req, res) {
    res.render("admin-pages/admin-login");
  })
  .post(function (req, res) {
    console.log(req.body);
    res.redirect("/admin/profile");
  });

// ADMIN PROFILE
app.get("/admin/profile", function (req, res) {
  res.render("admin-pages/admin-profile");
});

// HANDLE USERS
app.get("/admin/handle-users", function (req, res) {
  res.render("admin-pages/admin-handle-users");
});

// MEETINGS
app
  .route("/admin/meetings")

  .get(function (req, res) {
    res.render("admin-pages/admin-meetings");
  })
  .post(function (req, res) {
    res.redirect("/admin/meetings");
  });

// CIRCULARS
app
  .route("/admin/circulars")

  .get(function (req, res) {
    res.render("admin-pages/admin-circulars");
  })
  .post(function (req, res) {
    console.log(req.body);
    res.redirect("/admin/circulars");
  });

// AMENITIES
app
  .route("/admin/amenities")

  .get(function (req, res) {
    res.render("admin-pages/admin-amenities");
  })
  .post(upload.single("image"), function (req, res) {
    res.redirect("/admin/amenities");
  });

// COMPLAINTS
app
  .route("/admin/complaints")

  .get(function (req, res) {
    res.render("admin-pages/admin-complaints");
  });

// COMPLAINT PAGE
app
  .route("/admin/complaints/complaintId")

  .get(function (req, res) {
    res.render("admin-pages/complaint");
  })
  .post(function (req, res) {
    // this will handle psoting the comment to
    // the database and overwriting the defalut comment
    console.log(req.body);
    res.redirect("/admin/complaints");
  });

// USER PAGES

// REGISTRATION
app
  .route("/register")

  .get(function (req, res) {
    res.render("user-pages/user-registration");
  })
  .post(function (req, res) {
    console.log(req.body);
    res.redirect("home");
  });

// LOGIN
app
  .route("/login")

  .get(function (req, res) {
    res.render("user-pages/user-login");
  })
  .post(function (req, res) {
    console.log(req.body);
    res.redirect("/home");
  });

// HOME PAGE
app
  .route("/home")

  .get(function (req, res) {
    res.render("user-pages/user-home");
  });

// PROFILE
app
  .route("/profile")

  .get(function (req, res) {
    res.render("user-pages/user-profile");
  });

// SERVICES
app
  .route("/services")

  .get(function (req, res) {
    res.render("user-pages/user-services");
  });

// SERVICES/AMENITIES
app
  .route("/services/amenities")

  .get(function (req, res) {
    res.render("user-pages/user-amenities");
  })

  .post(function (req, res) {
    console.log(req.body);
    res.redirect("/services/amenities");
  });

// SERVICES/CIRCULARS
app
  .route("/services/circulars")

  .get(function (req, res) {
    res.render("user-pages/user-circulars");
  });

// SERVICES/COMPLAINTS
app
  .route("/services/complaints")

  .get(function (req, res) {
    res.render("user-pages/user-complaints");
  })

  .post(function (req, res) {
    console.log(req.body);
    res.redirect("/services/complaints");
  });

// CONTACT ADMIN/SECRETARY
app
  .route("/contact")

  .get(function (req, res) {
    res.render("user-pages/user-contact");
  });

app.listen(5000, function () {
  console.log("Server started on port 5000.");
});
