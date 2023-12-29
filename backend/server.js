const express = require("express");
const mysql = require("mysql2");
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
    methods: ["POST", "GET", "PUT"],
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
    },
  })
);

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   database: "deliveryappdb",
// });

const db = mysql.createPool({
  host: "sql.freedb.tech",
  user: "freedb_baanma",
  password: "@$ZUya6*hUJTs89",
  database: "freedb_deliveryappdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  authPlugins: {
    mysql_native_password: () =>
      require("mysql2/lib/auth/mysql_native_password"),
  },
});

const retryConnection = () => {
  db.query("SELECT 1 + 1 AS solution", (error, results, fields) => {
    if (error) {
      console.error(error);
      console.log("Retrying connection...");
      setTimeout(retryConnection, 5000);
      return;
    }
  });
};

retryConnection();

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not okay" });
      } else {
        req.user = decoded;
        console.log("User - " + req.user.userType);
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  if (req.user.username) {
    return res.json({
      valid: true,
      username: req.user.username,
      id: req.user.id.toString(),
      fName: req.user.fName,
      lName: req.user.lName,
      phoneNumber: req.user.phoneNumber,
      email: req.user.email,
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
          const { Login, ID, FirstName, LastName, Email, PhoneNumber } =
            data[0];
          const userType = table;

          const token = jwt.sign(
            {
              username: Login,
              id: ID,
              fName: FirstName,
              lName: LastName,
              email: Email,
              phoneNumber: PhoneNumber,
              userType: userType,
            },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );

          res.cookie("token", token);

          return res.json({
            login: true,
            username: Login,
            id: ID,
            userType: userType,
            fName: FirstName,
            lName: LastName,
            email: Email,
            phoneNumber: PhoneNumber,
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
  let date = new Date();
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
    date.toISOString().slice(0, 19).replace("T", " "),
    clientId.toString(),
    req.body.packageOption.toString(),
  ];

  const q =
    "INSERT INTO `order` (`SenderAddress`, `RecipientAddress`,`Date`,`ClientID`,`OrderDetailsName`) VALUES (?)"; //change Date data type to DATETIME in DataBase

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

app.get("/delivery", verifyUser, (req, res) => {
  const deliveryId = req.user.id;

  const q = "SELECT * FROM `order` WHERE `DeliveryID` = ?";

  db.query(q, [deliveryId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
});

app.get("/delivery/neworders", verifyUser, (req, res) => {
  const deliveryId = req.user.id;

  const q = "SELECT * FROM `order` WHERE `DeliveryID` IS NULL";

  db.query(q, [deliveryId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
});

app.put("/delivery/neworders/:orderId", verifyUser, async (req, res) => {
  const { orderId } = req.params;
  console.log("Received orderId:", orderId);
  const deliveryId = req.user.id;
  console.log("DELIVERY", deliveryId);

  try {
    const orderQuery =
      "SELECT * FROM `order` WHERE `ID` = ? AND `DeliveryID` IS NULL";
    const [order] = await db.promise().query(orderQuery, [orderId]);

    if (!order || order.length === 0) {
      return res.status(404).json({
        error: "Order not found or already assigned to a delivery person",
      });
    }

    const updateQuery = "UPDATE `order` SET `DeliveryID` = ? WHERE `ID` = ?";
    await db.promise().query(updateQuery, [deliveryId, orderId]);

    return res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updatePhoneNumber", verifyUser, async (req, res) => {
  const { phoneNumber } = req.body;
  const userId = req.user.id;
  const userType = req.user.userType;

  try {
    const checkQuery = "SELECT * FROM ?? WHERE ?? = ?";
    const [existingUser] = await db
      .promise()
      .query(checkQuery, [userType, "PhoneNumber", phoneNumber]);

    if (existingUser && existingUser.length > 0) {
      return res
        .status(400)
        .json({ error: "Numer telefonu już istnieje w bazie danych" });
    }

    let updateQuery;
    if (userType === "client") {
      updateQuery = "UPDATE `client` SET `PhoneNumber` = ? WHERE `ID` = ?";
    } else if (userType === "delivery") {
      updateQuery = "UPDATE `delivery` SET `PhoneNumber` = ? WHERE `ID` = ?";
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    await db.promise().query(updateQuery, [phoneNumber, userId]);

    return res
      .status(200)
      .json({ message: "Phone number updated successfully" });
  } catch (error) {
    console.error("Error updating phone number:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updateEmail", verifyUser, async (req, res) => {
  const { email } = req.body;
  const userId = req.user.id;
  const userType = req.user.userType;

  try {
    const checkQuery = "SELECT * FROM ?? WHERE ?? = ?";
    const [existingUser] = await db
      .promise()
      .query(checkQuery, [userType, "Email", email]);

    if (existingUser && existingUser.length > 0) {
      return res
        .status(400)
        .json({ error: "Adres e-mail już istnieje w bazie danych" });
    }

    let updateQuery;
    if (userType === "client") {
      updateQuery = "UPDATE `client` SET `Email` = ? WHERE `ID` = ?";
    } else if (userType === "delivery") {
      updateQuery = "UPDATE `delivery` SET `Email` = ? WHERE `ID` = ?";
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    await db.promise().query(updateQuery, [email, userId]);

    return res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    console.error("Error updating email:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updatePassword", verifyUser, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;
  const userType = req.user.userType;

  try {
    let getPasswordQuery;
    if (userType === "client") {
      getPasswordQuery = "SELECT `Password` FROM `client` WHERE `ID` = ?";
    } else if (userType === "delivery") {
      getPasswordQuery = "SELECT `Password` FROM `delivery` WHERE `ID` = ?";
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    const [result] = await db.promise().query(getPasswordQuery, [userId]);

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const oldHashedPassword = result[0].Password;

    bcrypt.compare(
      oldPassword.toString(),
      oldHashedPassword,
      async (err, response) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (response) {
          const newHashedPassword = await bcrypt.hash(
            newPassword.toString(),
            salt
          );

          let updatePasswordQuery;
          if (userType === "client") {
            updatePasswordQuery =
              "UPDATE `client` SET `Password` = ? WHERE `ID` = ?";
          } else if (userType === "delivery") {
            updatePasswordQuery =
              "UPDATE `delivery` SET `Password` = ? WHERE `ID` = ?";
          } else {
            return res.status(400).json({ error: "Invalid user type" });
          }

          await db
            .promise()
            .query(updatePasswordQuery, [newHashedPassword, userId]);
          return res
            .status(200)
            .json({ message: "Password updated successfully" });
        } else {
          return res.status(401).json({ error: "Incorrect old password" });
        }
      }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8081, () => {
  console.log("Backend");
});
