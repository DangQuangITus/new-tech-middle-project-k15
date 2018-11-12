var express = require("express");
var driverRepo = require("../repos/driverRepo");
var bodyParser = require("body-parser");

var router = express.Router();
var app = express();

app.use(bodyParser.json());

router.get("/", (req, res) => {
  res.render("driverindex", {
    title: "Driver Index",
  });
});

router.post("/register", (req, res) => {
  data = req.body;
  
  driverRepo.add(data)
  .then(value => {
    res.statusCode = 201;
    res.redirect('/driver');
  })
  .catch(err => {
    console.log(err);
    res.statusCode = 500;
    res.end("View error log on console");
  });
});

router.get("/register", function (req, res, next) {
  res.render("driverregister", {
    title: "Driver register form",
  });
});

router.get('/login', (req, res) => {
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
    if (rows.length > 0) {
      res.redirect('/driver');
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
