const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret', //key used to encrypt the session cookie
    resave: false,
    saveUninitialized: false,
    cookie:{
      secure:false,
      maxAge: 1000 * 60 * 60 * 24
    } //cookie properties
}))

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "deliveryappdb",
});

app.get('/', (req,res) => {
    if(req.session.username) {
      return res.json({valid:true, username: req.session.username})
    }
    else{
      return res.json({valid:false})
    }
})

app.post("/signup", (req, res) => {
  const values = [
    req.body.username,
    req.body.fName,
    req.body.lName,
    req.body.phoneNumber,
    req.body.email,
    req.body.password,
  ];

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
      return res.json("Invalid userType");
    }
  } else {
    console.log("Nie ma userType");
  }
});

app.post("/login", (req, res) => {
  let query;
  let table;
  console.log(req.body.userType);
  if (req.body.userType.toString() === "user") {
    query = "SELECT * FROM client WHERE Email = ? AND Password = ?";
    table = "client";
  } else if (req.body.userType.toString() === "delivery") {
    query = "SELECT * FROM delivery WHERE Email = ? AND Password = ?";
    table = "delivery";
  } else {
    return res.json("Invalid user type");
  }

  const values = [req.body.email, req.body.password];

  db.query(query, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.json("Error");
    }
    if (data.length > 0) {
      req.session.username = data[0].Login;
      //return res.json(`Success ${table}`);
      return res.json({Login: true, username: req.session.username, userType: table})
    }
    return res.json("Fail");
  });
});

app.post("/home", (req, res) => {
  const values = [
    req.body.InputZipCode1.toString() +
      req.body.InputStreet1.toString() +
      req.body.InputBuildingNumber1.toString() +
      req.body.InputApartmentNumber1.toString(),
    req.body.InputZipCode2.toString() +
      req.body.InputStreet2.toString() +
      req.body.InputBuildingNumber2.toString() +
      req.body.InputApartmentNumber2.toString(),
    req.body.packageOption.toString(),
  ];
  //You need to edit no null options in database for date etc.
  const q =
    "INSERT INTO `order` (`SenderAddress`, `RecipentAddress`,`OrderDetailsName`) VALUES (?)";

  console.log(req.body.packageOption.toString());

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log("Backend");
});
