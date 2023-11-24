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
        return res.json({ Error: "Token is not okay" });
      } else {
        req.user = {
          name: decoded.name,
          id: decoded.id,
        };
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  if (req.user.name) {
    return res.json({
      valid: true,
      name: req.user.name,
      id: req.user.id.toString(),
    });
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
  const { userType, email, password } = req.body;

  let query, table;

  if (userType === "user") {
    query = "SELECT * FROM client WHERE Email = ?";
    table = "client";
  } else if (userType === "delivery") {
    query = "SELECT * FROM delivery WHERE Email = ?";
    table = "delivery";
  } else {
    return res.json({ login: false, message: "Invalid user type" });
  }

  const values = [email];

  db.query(query, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Error: "Internal Server Error" });
    }

    if (data.length > 0) {
      bcrypt.compare(password.toString(), data[0].Password, (err, response) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ Error: "Internal Server Error" });
        }

        if (response) {
          const { Login, ID } = data[0];
          const token = jwt.sign({ name: Login, id: ID }, "jwt-secret-key", {
            expiresIn: "1d",
          });

          res.cookie("token", token);

          req.session.username = Login;
          req.session.id = ID;

          return res.json({
            login: true,
            username: req.session.username,
            id: req.session.id,
            userType: table,
          });
        } else {
          return res.json({ login: false, message: "Password not matched" });
        }
      });
    } else {
      return res.json({ login: false, message: "Fail" });
    }
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.post("/home", verifyUser, (req, res) => {
  const clientId = req.user.id;

  console.log(clientId.toString());

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
    clientId.toString(),
  ];

  const q =
    "INSERT INTO `order` (`SenderAddress`, `RecipentAddress`,`OrderDetailsName`,`ClientID`) VALUES (?)";

  console.log(req.body.packageOption.toString());

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
});

app.get("/myorders", verifyUser, (req, res) => {
  const clientId = req.user.id;

  const q = "SELECT * FROM `order` WHERE `ClientID` = ?";

  db.query(q, [clientId], (err, data) => {
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
