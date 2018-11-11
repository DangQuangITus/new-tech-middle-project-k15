var db = require("../fn/db");
var md5 = require('crypto-js/md5');

exports.add = (data) => {
  var status = "disable";
  var md5_pwd = md5(data.password);
  
  var query = `insert into driver(username, password, first_name, last_name, phone, status) values('${data.username}', '${md5_pwd}', '${data.first_name}', '${data.last_name}', '${data.phone}', '${status}')`;
  return db.save(query);
};
