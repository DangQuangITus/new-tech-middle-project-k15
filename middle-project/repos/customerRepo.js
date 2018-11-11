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
  var query = "SELECT id, name, address, phone, notes, status,reversegeocoding, DATE_FORMAT(createddate, '%d/%m/%Y') as date FROM customer order by createddate desc";
  return db.load(query);
};

exports.single = id => {
  return new Promise((resolve, reject) => {
    var query = "SELECT id, name, address, phone, notes, status,reversegeocoding, DATE_FORMAT(createddate, '%d/%m/%Y') as date FROM customer WHERE id = " + id + "";
    db.load(query)
      .then(rows => {
        //console.log(rows);
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

exports.add = (name, address, sdt, note, status, createddate) => {
  // var status = "not locate";
  var query =
    "INSERT INTO customer (`id`, `name`, `address`, `phone`, `notes`,`status`,`reversegeocoding`, `createddate`) VALUES (NULL, '" +
    name +
    "', '" +
    address +
    "', '" +
    sdt +
    "', '" +
    note +
    "', '" +
    status +
    "', NULL, '" +
    createddate +
    "');";
  return db.save(query);
};


exports.updateStatus = (status, id) => {
  var sql = "UPDATE `customer` SET `status`='" + status + "' WHERE `id`='" + id + "'";

  return db.save(sql);
}

exports.updateAddressNew = (reversegeocoding, id) => {
  var sql = "UPDATE `customer` SET `reversegeocoding`='" + reversegeocoding + "' WHERE `id`='" + id + "'";

  return db.save(sql);
}