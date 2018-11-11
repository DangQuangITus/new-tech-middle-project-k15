var express = require("express");
var router = express.Router();
var customerRepo = require("../repos/customerRepo");
/* GET home page. */
router.get("/", function (req, res, next) {
  customerRepo
    .loadAll()
    .then(rows => {
      //console.log(rows);
      // res.render("getCustomer", { data: rows });
      res.render("index", {
        title: "Đồ án giữa kỳ",
        data: rows
      });
      return rows;
    })
    .catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end("View error log on console");
    });
  // res.render("index", { title: "Đồ án giữa kỳ" });
});

module.exports = router;
