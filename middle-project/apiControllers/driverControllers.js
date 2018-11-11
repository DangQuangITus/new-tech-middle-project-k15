var express = require("express");
var driverRepo = require("../repos/driverRepo");
var bodyParser = require("body-parser");

var router = express.Router();
var app = express();

app.use(bodyParser.json());

router.get("/", (req, res) => {
  driverRepo
  .loadAll()
  .then(rows => {
    console.log(rows);
    // res.render("getCustomer", { data: rows });
    return rows;
  })
  .catch(err => {
    console.log(err);
    res.statusCode = 500;
    res.end("View error log on console");
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  data = req.body;
  
  driverRepo.add(data)
  .then(value => {
    res.statusCode = 201;
    res.json({
      msg: "driver added"
    });
  })
  .catch(err => {
    console.log(err);
    res.statusCode = 500;
    res.end("View error log on console");
  });
});

router.get("/login", function (req, res, next) {
  res.render("driverlogin", {
    title: "Đồ án giữa kỳ",
  });
});

module.exports = router;
