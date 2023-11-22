const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const salt = 10;
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret", //key used to encrypt the session cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    }, //cookie properties
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "deliveryappdb",
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not okey" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};


app.get("/", verifyUser, (req, res) => {
  if (req.session.username) {
    return res.json({ valid: true, username: req.session.username });
  } else {
    return res.json({ valid: false });
  }
});

app.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });
    const values = [
      req.body.username,
      req.body.fName,
      req.body.lName,
      req.body.phoneNumber,
      req.body.email,
      hash,
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
            return res.json({ Error: "Inseritng data Error in server" });
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
});

app.post("/login", (req, res) => {
  let query;
  let table;
  console.log(req.body.userType);
  if (req.body.userType.toString() === "user") {
    query = "SELECT * FROM client WHERE Email = ?";
    table = "client";
  } else if (req.body.userType.toString() === "delivery") {
    query = "SELECT * FROM delivery WHERE Email = ?";
    table = "delivery";
  } else {
    return res.json("Invalid user type");
  }

  const values = [req.body.email];

  db.query(query, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Error: "Internal Server Error" });
    }

    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].Password,
        (err, response) => {
          if (err)
            return res.status(500).json({ Error: "Internal Server Error" });

          if (response) {
            const name = data[0].Login;
            const token = jwt.sign({ name }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("token", token);
            req.session.username = data[0].Login;
            return res.json({
              login: true,
              username: req.session.username,
              userType: table,
            });
          } else {
            return res.json({ login: false, message: "Password not matched" });
          }
        }
      );
    } else {
      return res.json({ login: false, message: "Fail" });
    }
  });
});


app.get("/logout", (req,res) =>{
  res.clearCookie("token");
  return res.json({Status: "Success"})
})


app.post("/home", (req, res) => {
  const values = [
    req.body.InputZipCode1.toString() +
      req.body.InputCity1.toString() +
      req.body.InputStreet1.toString() +
      req.body.InputBuildingNumber1.toString() +
      req.body.InputApartmentNumber1.toString(),
    req.body.InputZipCode2.toString() +
      req.body.InputCity2.toString() +
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
