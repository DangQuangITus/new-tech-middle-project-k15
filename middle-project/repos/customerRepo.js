var db = require("../fn/db");
var randomstring = require("randomstring");

exports.geneId = () => {
  var id = randomstring.generate({
    length: 2,
    charset: "numeric"
  });
  if (!id) {
    console.log("không the generate");
  }
  return id;
};

exports.loadAll = () => {
  var query = "SELECT * FROM customer";
  return db.load(query);
};

exports.single = id => {
  return new Promise((resolve, reject) => {
    var query = "SELECT * FROM customer WHERE id = " + id + "";
    db.load(query)
      .then(rows => {
        if (rows.length === 0) {
          resolve(null);
        } else {
          resolve(rows[0]);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.add = (name, address, sdt, note) => {
  var status = "not locate";
  var query =
    "INSERT INTO customer (`id`, `name`, `address`, `phone`, `notes`,`status`) VALUES (NULL, '" +
    name +
    "', '" +
    address +
    "', '" +
    sdt +
    "', '" +
    note +
    "', '" +
    status +
    "');";
  return db.save(query);
};
