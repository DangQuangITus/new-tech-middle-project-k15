var express = require("express");
var router = express.Router();
// var customerRepo = require("../repos/customerRepo");
/* GET home page. */

router.get("/", function(req, res, next) {
  res.redirect("/driver");
});

module.exports = router;
