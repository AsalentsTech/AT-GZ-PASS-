const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const saltRounds = 10;
const app = express();

app.get("/", (req, res) => res.send("Back-end api running successfully!"));

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "AsalentsTech",
    secret: "NOSKIDS",
    resave: false,
    saveUninitialized: false,
  })
);

const MYSQL_HOST = process.env.REACT_APP_MYSQL_DBHOST;
const MYSQL_USER = process.env.REACT_APP_MYSQL_DBUSER;
const MYSQL_PASS = process.env.REACT_APP_MYSQL_MYSQL_DBPASS;
const MYSQL_DB = process.env.REACT_APP_MYSQL_DBNAME;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
})

app.post('/submitsecrete', (req, res) => {
    const secrete = req.body.secrete; 
    const code = req.body.code;
    
    db.query('INSERT INTO usersecrete (secrete, code) VALUES(?, ?)', 
    [secrete, code], 
    (err, result) => {
        if (err) {
            console.log(err);
        }
    });
});

app.post('/deletesecrete', (req, res) => {
    const code = req.body.code;
    
    db.query(`DELETE FROM usersecrete WHERE code = '${code}'`, 
    (err, result) => {
        if (err) {
            res.send(err);
        }
    });
});

app.post('/code', (req, res) => {
  const code = req.body.code;

  const selectQuery = `SELECT code FROM usersecrete WHERE code = ${code}`;
  db.query(selectQuery, (err, results) => {
    if(code === {data: results}) {
      res.json({data: results})
 }else {
  res.send(err)
 }
 });
});  

app.post('/viewencryptedmessage', function (req, res) {
  const code = req.body.code;

  db.query(`SELECT * FROM usersecrete WHERE code = '${code}' LIMIT 1`, function (err, results) {
    if(err) {
      res.send(err)
 }else {
    res.send(results)
    }
  });
});

app.post('/displaycode', function (req, res) {
  const secrete = req.body.secrete;

  db.query(`SELECT code FROM usersecrete WHERE secrete = '${secrete}' LIMIT 1`, function (err, results) {
    if(err) {
      res.send(err)
 }else {
    res.send(results)
    }
  });
});

  const PORTT = process.env.API_PORT || 3001;

app.listen(PORTT, () => {
    console.log("Back-end server is running");
});