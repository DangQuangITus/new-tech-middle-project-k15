var express = require("express");
var customerRepo = require("../repos/customerRepo");
var router = express.Router();
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

router.get("/", (req, res) => {
    res.render('driver', { title: "driver" });
});
module.exports = router;
