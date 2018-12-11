var mysql = require("mysql");

// create connection to DB app1
var createConnection = () => {
  return mysql.createConnection({
    host: "127.0.0.1",
    port: "33060",
    user: "root",
    password: "12345",
    database: "app1"
  });
};

//
exports.load = sql => {
  return new Promise((resolve, reject) => {
    var cn = createConnection();
    cn.connect();
    cn.query(sql, (error, rows, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
      cn.end();
    });
  });
};

exports.save = sql => {
  return new Promise((resolve, reject) => {
    var cn = createConnection();
    cn.connect();
    cn.query(sql, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
      cn.end();
    });
  });
};
