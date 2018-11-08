var express = require('express');
var customerRepo = require('../repos/customerRepo');

var router = express.Router();

router.get('/', (req, res) => {
	customerRepo.loadAll()
		.then(rows => {
			res.json(rows);
		}).catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		})
})

// router.get('/:word', (req, res) => {
// 	var word = req.params.word;
// 	console.log("=======params=========");
// 	console.log(word);
	
//     frenchRepo.single(word)
// 		.then(rows => {
// 			//console.log(rows);
// 			res.json(rows);
// 		}).catch(err => {
// 			console.log(err);
// 			res.statusCode = 500;
// 			res.end('View error log on console');
// 		})
// })

router.post('/', (req, res) => {
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var notes = req.body.notes;
    var ret = {
        name: name,
        phone: phone,
        address: address,
        notes: notes
    };
	customerRepo.add(name, address, phone, notes).then(value => {
		res.statusCode = 201;
		res.json({
			msg: 'customer added'
		});
	  }).catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.end('View error log on console');
	  });
    //res.json(ret);
})
module.exports = router;