var express = require("express");
var customerRepo = require("../repos/customerRepo");
var router = express.Router();
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

router.get("/", (req, res) => {
  customerRepo
    .loadAll()
    .then(rows => {
      console.log(rows);
      res.render("getCustomer", { data: rows });
      return rows;
    })
    .catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end("View error log on console");
    });
});

router.get("/useraddress/:id", (req, res) => {
  console.log("req la: ", req.params);
  var id = req.params.id;

  customerRepo.single(id).then(c => {
    //console.log(c);
    var status = 'located';
    customerRepo.updateStatus(status, c.id).then(value => {
      console.log("update status located");
    }).catch(err => {
      res.end('fail');
    });
    var address = c.address;
    res.json({
      searchtext: address
    });
  });
});

router.post("/", (req, res) => {
  // var dataReic = JSON.parse(req.body);
  var dataReic = req.body;
  // console.log("get post o day", dataReic.name);
  customerRepo
    .add(
      dataReic.name,
      dataReic.address,
      dataReic.sdt,
      dataReic.note,
      dataReic.status,
      dataReic.createddate
    )
    .then(value => {
      res.statusCode = 201;
      res.json({
        msg: "customer added"
      });
    })
    .catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end("View error log on console");
    });
  //res.json(ret);
});
module.exports = router;
