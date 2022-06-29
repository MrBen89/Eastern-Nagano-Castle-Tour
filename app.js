const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
require("dotenv").config({path: "./config.env"});

const app = express();

const user = process.env.USER;
const password = process.env.PASS;
const apikey = process.env.API;

app.set('view engine', 'ejs');

app.use(express.static("public"));

//connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: user,
    password: password
})

db.connect(err => {
    if(err) {
        console.log(err)
    }
    console.log("db connected")
})


// initialise castles and save all the records from the DB to it.
let castles = [];
let castleNumber = 0;

//this initial query allows the first page load after a server reboot to show castles without refresh

db.query('select * from castlelist.castles', (err, res) => {
    castles = res;
});


app.get("/", (req, res) => {
    db.query('select * from castlelist.castles', (err, res) => {
        castles = res;
    });

    res.render("index", {castles: JSON.stringify(castles), apikey: apikey})
})

app.listen("3000", () => {
    console.log("server started on port 3000")
});
