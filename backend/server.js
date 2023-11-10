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
  //console.log(req.body.userType)

  //const userType = req.body.userType;
  // if (req.body.userType !== 'user' && req.body.userType !== 'delivery') {
  //   return res.status(400).json({ error: "Invalid userType111" });
  // }

  // const qClient =
  //   "INSERT INTO deliveryappdb.klient (`Login`,`Imie`,`Nazwisko`,`NumerTelefonu`,`E-mail`,`Haslo`) VALUES (?)";

  // const qDelivery =
  //   "INSERT INTO deliveryappdb.kurier (`Login`,`Imie`,`Nazwisko`,`NumerTelefonu`,`E-mail`,`Haslo`) VALUES (?)";

  const values = [
    req.body.username,
    req.body.fName,
    req.body.lName,
    req.body.phoneNumber,
    req.body.email,
    req.body.password,
  ];

  

  let tmp = req.body.userType.value;

  if ("userType" in req.body) {
    if (req.body.userType.toString() === "user") {
      const qClient =
        "INSERT INTO deliveryappdb.klient (`Login`,`Imie`,`Nazwisko`,`NumerTelefonu`,`E-mail`,`Haslo`) VALUES (?)";

      db.query(qClient, [values], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json("Error");
        }
        return res.json(data);
      });
    } else if (req.body.userType.toString() === "delivery") {
      const qDelivery =
        "INSERT INTO deliveryappdb.kurier (`Login`,`Imie`,`Nazwisko`,`NumerTelefonu`,`E-mail`,`Hasło`) VALUES (?)";

      db.query(qDelivery, [values], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json("Error");
        }
        return res.json(data);
      });
    } else {
      //return res.json("Invalid userType");
      console.log(req.body.userType);
    }
  } else {
    console.log("Nie ma userType");
  }
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
