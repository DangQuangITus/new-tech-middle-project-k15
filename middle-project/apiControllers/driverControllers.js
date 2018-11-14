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
    res.statusCode = 201;
    res.redirect('/driver/login');
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
    if (rows.length > 0) {
      req.session.user = rows[0].id;
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

router.post('/location', (req, res) => {
  console.log(req.session.user);
  driverRepo.update_location(req.session.user, req.body.location)
  .then(rows => {
    res.json({
      msg: 'Updated location'
    })
  })
  .catch(err => {
    console.log(err);
    res.statusCode = 500;
    res.end('View error log on console');
  })
});

// route for user logout
app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
