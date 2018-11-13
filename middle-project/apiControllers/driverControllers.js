var express = require("express");
var driverRepo = require("../repos/driverRepo");
var bodyParser = require("body-parser");

var router = express.Router();
var app = express();

app.use(bodyParser.json());

var sessionChecker = (req, res, next) => {
  if (req.cookies.user_sid && req.session.user) {
    res.render("driverindex", {
      title: "Driver Index page",
    });
  } else {
    next()
  }
};

router.get("/", sessionChecker, (req, res) => {
  res.redirect('/driver/login');
});

// Register
router.get("/register", sessionChecker, function (req, res, next) {
  res.render("driverregister", {
    title: "Driver register form",
  });
});

router.post("/register", (req, res) => {
  driverRepo.add(req.body)
  .then(value => {
    req.session.user = value;
    res.statusCode = 201;
    res.redirect('/driver');
  })
  .catch(err => {
    console.log(err);
    res.statusCode = 500;
    res.end("View error log on console");
  });
});

// Login
router.get('/login', sessionChecker, (req, res) => {
  res.render("driverlogin", {
    title: "Driver register form",
  });
});

router.post('/login', (req, res) => {
  driverRepo.login(req.body)
  .then(rows => {
    console.log('ROWS: ', rows);
    if (rows.length > 0) {
      req.session.user = rows[0];
      res.redirect('/driver');
    } else {
      res.redirect('/driver/login');
    }
  })
  .catch(err => {
    console.log(err);
    res.statusCode = 500;
    res.end('View error log on console');
  })
  
});

module.exports = router;
