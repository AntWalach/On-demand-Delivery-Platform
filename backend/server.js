const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "deliveryappdb",
});

app.post("/signup", (req, res) => {
  const q =
    "INSERT INTO klient (`Login`,`Imie`,`Nazwisko`,`NumerTelefonu`,`E-mail`,`Haslo`) VALUES (?)";
  const values = [
    req.body.username,
    req.body.fName,
    req.body.lName,
    req.body.phoneNumber,
    req.body.email,
    req.body.password,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const q = "SELECT * FROM klient WHERE `E-mail` = ? AND `Haslo` = ?";
  const values = [req.body.email, req.body.password];
  db.query(q, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json("Error");

    if (data.length > 0) return res.json("Success");
    return res.json("Fail");
  });
});

app.listen(8081, () => {
  console.log("Backend");
});
