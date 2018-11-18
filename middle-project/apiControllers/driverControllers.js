var express = require("express");
var driverRepo = require("../repos/driverRepo");
var bodyParser = require("body-parser");
var session = require("express-session");
var router = express.Router();
var app = express();
var status = require("../public/constants/statusdriver");
app.use(bodyParser.json());
var sessionstorage = require("sessionstorage");

// session.startSession(req, res, callback);
var sessionChecker = (req, res, next) => {
  if (req.cookies.user_sid && req.session.user) {
    // res.render("driverindex", { title: "Driver Index page" });
    res.redirect("/apidriver");
  } else {
    next();
  }
};

router.get("/", sessionChecker, (req, res) => {
  res.redirect("/driver/login");
});

// Register
router.get("/register", sessionChecker, function(req, res, next) {
  res.render("driverregister", {
    title: "Driver register form"
  });
});

router.post("/register", (req, res) => {
  driverRepo
    .add(req.body)
    .then(value => {
      res.statusCode = 201;
      res.redirect("/driver/login");
    })
    .catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end("View error log on console");
    });
});

// Login
router.get("/login", sessionChecker, (req, res) => {
  res.render("driverlogin", {
    title: "Driver login form"
  });
});

router.post("/login", (req, res) => {
  driverRepo
    .login(req.body)
    .then(rows => {
      if (rows.length > 0) {
        driverRepo
          .changeDriverStatus(status.available, rows[0].username)
          .then(rows => {
            console.log("update status: ", rows);
          });
        req.session.user = rows[0].id;
        sessionstorage.setItem(rows[0].id, rows[0].username);
        console.log("login data: ", rows[0]);
        res.redirect("/apidriver");
      } else {
        res.redirect("/driver/login");
      }
    })
    .catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end("View error log on console");
    });
});

router.get("/location", (req, res) => {
  driverRepo
    .get_location(req.session.user)
    .then(rows => {
      var coord = {};
      if (rows.length) {
        coord = rows[0].location;
      }
      res.json({
        coord: coord
      });
    })
    .catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end("View error log on console");
    });
});

router.put("/location", (req, res) => {
  driverRepo
    .update_location(req.session.user, req.body.location)
    .then(rows => {
      res.json({
        msg: "Updated location"
      });
    })
    .catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end("View error log on console");
    });
});

router.get("/status", (req, res) => {
  driverRepo
    .get_status(req.session.user)
    .then(rows => {
      var status = "";
      if (rows.length) {
        status = rows;
      }
      console.log(status);
      res.json({
        status: status
      });
    })
    .catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end("View error log on console");
    });
});

router.put("/status", (req, res) => {
  driverRepo
    .get_location(req.session.user)
    .then(rows => {
      if (rows.length) {
        var current_status = rows[0].status;

        if (current_status === "disable") current_status = "ready";
        else if (current_status === "ready") current_status = "busy";
        else if (current_status === "busy") current_status = "disable";

        driverRepo
          .update_status(req.session.user, current_status)
          .then(rows => {
            res.json({
              msg: "Updated status"
            });
          })
          .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end("View error log on console");
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end("View error log on console");
    });
});

// route for user logout
router.post("/logout", (req, res) => {
  console.log("logout");
  if (req.cookies.user_sid) {
    console.log(req.cookies.user_sid);
    res.clearCookie("user_sid");
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
