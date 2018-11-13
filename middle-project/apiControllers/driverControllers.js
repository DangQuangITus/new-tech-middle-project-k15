var express = require("express");
var driverRepo = require("../repos/driverRepo");
var bodyParser = require("body-parser");

var router = express.Router();
var app = express();

app.use(bodyParser.json());

var sessionChecker = (req, res, next) => {
  console.log('=======================', req.cookies.user_sid);
  if (req.cookies.user_sid) {
    res.render("driverindex", {
      title: "Driver Index",
    });
  } else {
    next()
  }
};

router.get("/", (req, res) => {
  sessionChecker(req, res, () => {
    res.render("driverlogin", {
      title: "Driver Login",
    });
  })
});

// Register
router.get("/register", sessionChecker, function (req, res, next) {
  res.render("driverregister", {
    title: "Driver register form",
  });
});

router.post("/register", (req, res) => {
  data = req.body;
  
  driverRepo.add(data)
  .then(value => {
    req.session.user = value;
    res.statusCode = 201;
    res.render("driverindex", {})
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
  
  // userRepo.login(req.body)
  // 	.then(rows => {
  // 		if (rows.length > 0) {
  // 			var userEntity = rows[0];
  // 			var acToken = authRepo.generateAccessToken(userEntity);
  // 			var rfToken = authRepo.generateRefreshToken();
  //
  // 			authRepo.updateRefreshToken(userEntity.f_ID, rfToken)
  // 				.then(value => {
  // 					res.json({
  // 						auth: true,
  // 						user: userEntity,
  // 						access_token: acToken,
  // 						refresh_token: rfToken
  // 					})
  // 				})
  // 				.catch(err => {
  // 					console.log(err);
  // 					res.statusCode = 500;
  // 					res.end('View error log on console');
  // 				})
  // 		} else {
  // 			res.json({
  // 				auth: false
  // 			})
  // 		}
  // 	})
  // 	.catch(err => {
  // 		console.log(err);
  // 		res.statusCode = 500;
  // 		res.end('View error log on console');
  // 	})
  
});

router.post('/login', (req, res) => {
  driverRepo.login(req.body)
  .then(rows => {
    console.log('ROWS: ', rows);
    if (rows.length > 0) {
      res.render("driverindex", {})
    } else {
      res.render("driverregister", {
        title: "Driver register form",
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.statusCode = 500;
    res.end('View error log on console');
  })
  
});

module.exports = router;
