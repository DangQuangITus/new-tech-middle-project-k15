var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'SELECT * FROM customer';
    return db.load(sql);
}

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM customer WHERE id = "+ id +"";
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

exports.add = (name, address, phone, notes) => {
    var status = "not locate";
    var sql = "INSERT INTO customer (`id`, `name`, `address`, `phone`, `notes`,`status`) VALUES (NULL, '"+name+"', '"+address+"', '"+phone+"', '"+notes+"', '"+status+"');"
    return db.save(sql);
}

