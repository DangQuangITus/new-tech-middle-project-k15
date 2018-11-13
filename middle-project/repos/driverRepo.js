var db = require("../fn/db");
var md5 = require('crypto-js/md5');

exports.add = (data) => {
  var status = "disable";
  var md5_pwd = md5(data.password);
  
  var query = `insert into driver(username, password, first_name, last_name, phone, status) values('${data.username}', '${md5_pwd}', '${data.first_name}', '${data.last_name}', '${data.phone}', '${status}')`;
  return db.save(query);
};

exports.login = loginEntity => {
  var md5_pwd = md5(loginEntity.password);
  console.log('Password: ', md5_pwd.toString());
  var sql = `select * from driver where username = '${loginEntity.username}' and password = '${md5_pwd}'`;
  rows = db.load(sql);
  return rows
};

console.update_location = (driver_id, driver_location) => {
  var sql = `update driver set location = '${driver_location}' where id = '${driver_id}'`;
  return db.save(sql);
};

console.update_status = (driver_id, driver_status) => {
  var sql = `update driver set status = '${driver_status}' where id = '${driver_id}'`;
  return db.save(sql);
};