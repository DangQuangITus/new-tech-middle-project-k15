var db = require("../fn/db");
var md5 = require('crypto-js/md5');

exports.add = (data) => {
  var status = "disable";
  var md5_pwd = md5(data.driver_password);
  
  var query = `insert into driver(username, password, first_name, last_name, phone, status) values('${data.driver_username}', '${md5_pwd}', '${data.driver_first_name}', '${data.driver_last_name}', '${data.driver_phone}', '${status}')`;
  return db.save(query);
};

exports.login = loginEntity => {
  var md5_pwd = md5(loginEntity.driver_password);
  var sql = `select * from driver where username = '${loginEntity.driver_username}' and password = '${md5_pwd}'`;
  return db.load(sql);
};
