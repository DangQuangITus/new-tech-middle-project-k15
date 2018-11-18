var express = require("express");
var adminRepo = require("../repos/adminRepo");
var bodyParser = require("body-parser");
var session = require("express-session");
var router = express.Router();
var app = express();
var status = require("../public/constants/statusdriver");
app.use(bodyParser.json());
var sessionstorage = require("sessionstorage");

// session.startSession(req, res, callback);
var sessionChecker = (req, res, next) => {
  console.log(
    "to admin page" + req.cookies.user_sid + " - " + req.session.admin
  );
  if (req.cookies.user_sid && req.session.admin) {
    res.render("index", { title: "admin home page" });
  } else {
    next();
  }
};

router.get("/", sessionChecker, (req, res) => {
  res.redirect("/admin/login");
});

router.get("/login", (req, res) => {
  console.log("data curent login: " + req.session.admin);
  if (req.cookies.user_sid && req.session.admin) {
    res.redirect("/admin");
  } else {
    res.render("adminlogin", { title: "Admin login form" });
  }
});

router.post("/addadmin", (req, res) => {
  adminRepo
    .add(req.body)
    .then(value => {
      res.statusCode = 201;
      res.redirect("/admin/login");
    })
    .catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end("View error log on console");
    });
});

router.get("/addadmin", (req, res) => {
  if (req.cookies.user_sid && req.session.admin) {
    res.render("addadmin", { title: "add admin page" });
  } else {
    res.redirect("/admin/login");
  }
});

router.post("/login", (req, res) => {
  adminRepo
    .login(req.body)
    .then(rows => {
      if (rows.length > 0) {
        // console.log("data adimin login: " + rows);
        req.session.admin = rows[0].id;
        // sessionstorage.setItem(rows[0].id, rows[0].username);
        console.log("admin login data: ", req.session.admin);
        res.redirect("/admin");
      } else {
        res.redirect("/admin/login");
      }
    })
    .catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end("View error log on console");
    });
});

// route for user logout
router.get("/logout", (req, res) => {
  console.log("logout");
  if (req.session.admin) {
    // console.log(req.cookies.user_sid);
    // var id = req.session.admin;
    res.clearCookie("user_sid");
    req.session.admin = null;
    console.log("session admin: " + req.session.admin);
    res.redirect("/admin");
  } else {
    res.redirect("/admin/login");
  }
});

module.exports = router;
