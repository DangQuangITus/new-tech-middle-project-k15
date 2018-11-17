var db = require("../fn/db");
var md5 = require("crypto-js/md5");
var status = require("./../public/constants/status");
exports.add = data => {
  // var status = "disable";
  var md5_pwd = md5(data.driver_password);

  var query = `insert into driver(username, password, first_name, last_name, phone, status) values('${
    data.driver_username
  }', '${md5_pwd}', '${data.driver_first_name}', '${data.driver_last_name}', '${
    data.driver_phone
  }', '${status.disable}');`;
  return db.save(query);
};

exports.changeDriverStatus = (status, username) => {
  var sql =
    "update driver set status = '" +
    status +
    "' where username = '" +
    username +
    "'";
  return db.load(sql);
};
exports.login = data => {
  var md5_pwd = md5(data.driver_password);
  var sql = `select * from driver where username = '${
    data.driver_username
  }' and password = '${md5_pwd}'`;
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
