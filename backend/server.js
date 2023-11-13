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
        "INSERT INTO client (`Login`,`FirstName`,`LastName`,`PhoneNumber`,`Email`,`Password`) VALUES (?)";

      db.query(qClient, [values], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json("Error");
        }
        return res.json(data);
      });
    } else if (req.body.userType.toString() === "delivery") {
      const qDelivery =
        "INSERT INTO delivery (`Login`,`FirstName`,`LastName`,`PhoneNumber`,`Email`,`Password`) VALUES (?)";

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
  const q = "SELECT * FROM client WHERE `Email` = ? AND `Password` = ?";
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