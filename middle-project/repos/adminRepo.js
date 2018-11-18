var db = require("../fn/db");
var md5 = require("crypto-js/md5");
var status = require("../public/constants/statusdriver");
var adminstt = require("./../public/constants/statusadmin");
// exports.changeDriverStatus = (status, username) => {
//   var sql =
//     "update driver set status = '" +
//     status +
//     "' where username = '" +
//     username +
//     "'";
//   return db.load(sql);
// };
exports.add = data => {
  // var status = "disable";
  var md5_pwd = md5(data.admin_password);

  var query = `insert into admin(username, password, firstname, lastname, phone, status) values('${
    data.admin_username
  }', '${md5_pwd}', '${data.admin_first_name}', '${data.admin_last_name}', '${
    data.admin_phone
  }', '${adminstt.active}');`;
  return db.save(query);
};

exports.login = data => {
  var md5_pwd = md5(data.admin_password);
  console.log(
    "before admin: " + data.admin_password + ", after admin: " + md5_pwd
  );
  var sql = `select * from admin where username = '${
    data.admin_username
  }' and password = '${md5_pwd}'`;
  return db.load(sql);
};

// exports.get_location = driver_id => {
//   var sql = `select location from driver where id = '${driver_id}'`;
//   return db.load(sql);
// };

// exports.update_location = (driver_id, driver_location) => {
//   location = JSON.stringify(driver_location);
//   var sql = `update driver set location = '${location}' where id = '${driver_id}'`;
//   return db.save(sql);
// };

// exports.get_status = driver_id => {
//   var sql = `select status from driver where id = '${driver_id}'`;
//   return db.load(sql);
// };

// exports.update_status = (driver_id, driver_status) => {
//   var sql = `update driver set status = '${driver_status}' where id = '${driver_id}'`;
//   return db.save(sql);
// };
