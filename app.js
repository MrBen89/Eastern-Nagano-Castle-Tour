const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "bananarama"
})

db.connect(err => {
    if(err) {
        console.log(err)
    }
    console.log("db connected")
})



let castles = [];
let castleNumber = 0;


// db.query('select * from castlelist.castles', (err, res) => {
//     castles = res;
// });

// function callCastles(castles) {
//     return castles
// }

// function initMap() {
//     const myLatLng = { lat: 36.29739303213108, lng: 138.53031026316654 };
//
//     map = new google.maps.Map(document.getElementById('map'), {
//       center: myLatLng,
//       zoom: 10
//     });
//
//
//     db.query('select * from castlelist.castles', (err, res) => {
//         castles = res;
//
//
//         castles.forEach(function(castle) {
//         var castle = new google.maps.Marker({
//             position: {castle_x, castle_y},
//             map,
//             title: castle.castle_name,
//             icon: castle.icon,
//             owner: castle.castle_built_by,
//             built: castle.castle_date,
//             information: castle.castle_info
//         })
//
//             google.maps.event.addListener(castle, 'click', function() {
//                 console.log("click")
//                 document.getElementById('castleTitle').innerHTML = castle.title;
//                 document.getElementById('castleDate').innerHTML = "Built: " + castle.built;
//                 document.getElementById('castleOwner').innerHTML = "Built by: " + castle.owner;
//                 document.getElementById('castleInfo').innerHTML =  castle.information;
//                 document.getElementById('castlePhoto').src = castle.title + ".png" ;
//             });
//
//
//         });
//     })
//     console.log(castles);
//
// };



var map;
// let castles = [
//   {position:{lat: 36.29739303213108, lng: 138.53031026316654},
//   title: "Nashizawa-jo",
//   icon: "sanadaflag.png",
//   owner: "Ooi Shouji",
//   built: "1221",
//   information: "Built close by to modern day Housho-jinja, Nashizawa-jo was a fortified mansion from the Kamakura period. Today nothing remains, and the castle site is currently a residential area."},
//   {position: {lat:36.2264890777211, lng:138.44140826285997},
//   title: "Maeyama-jo",
//   icon: "sanadaflag.png",
//   owner: "Tomono Mitsutoshi",
//   built: "Approx 1475",
//   information: "Built on a hill overlooking the Nakazawa river. The castle was captured multiple times by the Takeda, and today little remains."},
//   {position: {lat:36.196111, lng:138.501667},
//   title: "Tatsuoka-jo",
//   icon: "sanadaflag.png",
//   owner: "Matsudaira Noritaka",
//   built: "1867",
//   information: "One of only 2 pentagonal castles in Japan, Tatsuoka-jo was a short lived fortress built in late Edo period, and torn down early in the Meiji period. Parts of the walls and moat remain, and the inside is currently a school."}
// ];


app.get("/", (req, res) => {
    db.query('select * from castlelist.castles', (err, res) => {
        castles = res;
    });

    res.render("index", {castles: JSON.stringify(castles)})
})

app.listen("3000", () => {
    console.log("server started on port 3000")
});
