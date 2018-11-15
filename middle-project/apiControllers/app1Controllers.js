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
      var categories = rows;
      res.json({
        categories
        //data: rows
      });
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
    var status = "2";
    customerRepo
      .updateStatus(status, c.id)
      .then(value => {
        console.log("update status located");
        var address = c.address;
        res.json({
          searchtext: address
        });
      })
      .catch(err => {
        res.end("fail");
      });
  });
});

router.get("/updateaddress", (req, res) => {
  var id = req.query.id;
  var address = req.query.address;
  customerRepo.single(id).then(c => {
    //console.log(c);
    customerRepo
      .updateAddressNew(address, c.id)
      .then(value => {
        console.log("update address successfully");
        res.json({
          newaddress: address
        });
      })
      .catch(err => {
        res.end("fail");
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
      var c = { name: "nnn" };
      res.statusCode = 201;

      customerRepo
        .loadAll()
        .then(rows => {
          var data = rows;
          res.json({
            data
          });
        })
        .catch(err => {
          console.log(err);
          res.statusCode = 500;
          res.end("View error log on console");
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
