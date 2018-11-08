var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');

var app1Controllers = require('./apiControllers/app1Controllers');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        msg: 'hello from nodejs express api'
    })
});
var geo = require('mapbox-geocoding');

// app.post('/api/app1', (req, res) => {
//     var name = req.query.name;
//     var phone = req.query.phone;
//     var address = req.query.address;
//     var notes = req.query.notes;
//     var ret = {
//         name: name,
//         phone: phone,
//         address: address,
//         notes: notes
//     };
//     //https://www.mapbox.com/api-documentation/#endpoints
//     //https://api.mapbox.com/geocoding/v5/mapbox.places/Au co, Ho Chi Minh.json?access_token=pk.eyJ1IjoicGh1b25nLXRkIiwiYSI6ImNqbzI3a21pcjBoOHozcW1mMW05dDZsencifQ.xta_9x3JmLZSD511A7sMVQ
//     console.log(ret);
//     geo.setAccessToken('pk.eyJ1IjoicGh1b25nLXRkIiwiYSI6ImNqbzI3a21pcjBoOHozcW1mMW05dDZsencifQ.xta_9x3JmLZSD511A7sMVQ');
 
//     // Geocode an address to coordinates
//     geo.geocode('mapbox.places', address, function (err, geoData) {
//         console.log(geoData);
//         console.log("=========================================");
//         //res.json(geoData);
//     });
 
//   // Reverse geocode coordinates to address.
// //   geo.reverseGeocode('mapbox.places', '4.8936580', '52.3731720', function (err, geoData) {
// //       console.log(geoData);
// //       res.json(geoData);

// //   });
//     res.json(ret);
// });

app.use('/api/app1', app1Controllers);

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`TRANSLATE API is running on port ${port}`);
})