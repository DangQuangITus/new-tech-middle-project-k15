var db = require("../fn/db");
// var SHA256 = require("crypto-js/sha256");
// var CryptoJS = require("crypto-js");
var sha1 = require("js-sha1");
exports.add = data => {
  var status = "disable";
  // var SHA256_PW = SHA256(data.driver_password);
  var pw = sha1(data.driver_password);

  console.log("add: ", pw);
  var query = `insert into driver(username, password, first_name, last_name, phone, status) values('${
    data.driver_username
  }', '${pw}', '${data.driver_first_name}', '${data.driver_last_name}', '${
    data.driver_phone
  }', '${status}');`;
  return db.save(query);
};

exports.login = data => {
  // var SHA256_PW = String(SHA256(data.driver_password));
  // var SHA256_PW2 = SHA256(data.driver_password);
  var pw = sha1(data_driver_password);
  console.log(pw);
  var sql = `select * from driver where username = '${
    data.driver_username
  }' and password = '${pw}'`;
  return db.load(sql);
};

exports.get_location = driver_id => {
  var sql = `select location from driver where id = '${driver_id}'`;
  return db.load(sql);
};

exports.update_location = (driver_id, driver_location) => {
  location = JSON.stringify(driver_location);
  var sql = `update driver set location = '${location}' where id = '${driver_id}'`;
  return db.save(sql);
};

exports.get_status = driver_id => {
  var sql = `select status from driver where id = '${driver_id}'`;
  return db.load(sql);
};

exports.update_status = (driver_id, driver_status) => {
  var sql = `update driver set status = '${driver_status}' where id = '${driver_id}'`;
  return db.save(sql);
};
