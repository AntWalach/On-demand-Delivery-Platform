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
    methods: ["POST", "GET", "PUT", "DELETE"],
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
      if (req.body.userType.toString() === "Client") {
        const qClient =
          "INSERT INTO Client (`Login`,`FirstName`,`LastName`,`PhoneNumber`,`Email`,`Password`) VALUES (?)";

        db.query(qClient, [values], (err, data) => {
          if (err) {
            console.error(err);
            return res.status(500).json("Error");
          }

          const clientId = data.insertId;

          const walletValues = [0, clientId];

          const qWallet =
            "INSERT INTO Wallet (`Balance`, `ClientID`) VALUES (?)";

          db.query(qWallet, [walletValues], (err, walletData) => {
            if (err) {
              console.error(err);
              return res.status(500).json("Error creating wallet");
            }

            return res.json({ clientData: data, walletData });
          });
        });
      } else if (req.body.userType.toString() === "Delivery") {
        const qDelivery =
          "INSERT INTO Delivery (`Login`,`FirstName`,`LastName`,`PhoneNumber`,`Email`,`Password`) VALUES (?)";

        db.query(qDelivery, [values], (err, data) => {
          if (err) {
            console.error(err);
            return res.json({ Error: "Inserting data Error in server" });
          }

          const deliveryId = data.insertId;

          const walletValues = [0, deliveryId];

          const qWallet =
            "INSERT INTO DeliveryWallet (`Balance`, `DeliveryID`) VALUES (?)";

          db.query(qWallet, [walletValues], (err, walletData) => {
            if (err) {
              console.error(err);
              return res.status(500).json("Error creating wallet");
            }

            return res.json({ clientData: data, walletData });
          });
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

  if (userType === "Client") {
    query = "SELECT * FROM Client WHERE Email = ?";
    table = "Client";
  } else if (userType === "Delivery") {
    query = "SELECT * FROM Delivery WHERE Email = ?";
    table = "Delivery";
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
    1,
  ];

  const q =
    "INSERT INTO `Order` (`SenderAddress`, `RecipientAddress`,`Date`,`ClientID`, `OrderDetailsName`,`OrderStatusID`) VALUES (?)"; //change Date data type to DATETIME in DataBase

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

  const q =
    "SELECT `Order`.*, OrderStatus.status FROM `Order` LEFT JOIN OrderStatus ON Order.OrderStatusID=OrderStatus.ID WHERE `ClientID` = ? AND Order.OrderStatusID != 5";

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

  const q =
    "SELECT `Order`.*, OrderStatus.status FROM `Order` LEFT JOIN OrderStatus ON Order.OrderStatusID=OrderStatus.ID WHERE `DeliveryID` = ? AND Order.OrderStatusID != 5";

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

  const q = "SELECT * FROM `Order` WHERE `DeliveryID` IS NULL";

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
      "SELECT * FROM `Order` WHERE `ID` = ? AND `DeliveryID` IS NULL";
    const [order] = await db.promise().query(orderQuery, [orderId]);

    if (!order || order.length === 0) {
      return res.status(404).json({
        error: "Order not found or already assigned to a delivery person",
      });
    }

    const updateQuery =
      "UPDATE `Order` SET `DeliveryID` = ?, `OrderStatusID` = 2 WHERE `ID` = ?";
    await db.promise().query(updateQuery, [deliveryId, orderId]);

    return res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updateUsername", verifyUser, async (req, res) => {
  const { username } = req.body;
  const userId = req.user.id;
  const userType = req.user.userType;

  try {
    let updateQuery;
    if (userType === "Client") {
      updateQuery = "UPDATE `Client` SET `Login` = ? WHERE `ID` = ?";
    } else if (userType === "Delivery") {
      updateQuery = "UPDATE `Delivery` SET `Login` = ? WHERE `ID` = ?";
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    await db.promise().query(updateQuery, [username, userId]);

    return res.status(200).json({ message: "Username updated successfully" });
  } catch (error) {
    console.error("Error updating username:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updateLastName", verifyUser, async (req, res) => {
  const { lName } = req.body;
  const userId = req.user.id;
  const userType = req.user.userType;

  try {
    let updateQuery;
    if (userType === "Client") {
      updateQuery = "UPDATE `Client` SET `LastName` = ? WHERE `ID` = ?";
    } else if (userType === "Delivery") {
      updateQuery = "UPDATE `Delivery` SET `LastName` = ? WHERE `ID` = ?";
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    await db.promise().query(updateQuery, [lName, userId]);

    return res.status(200).json({ message: "Last name updated successfully" });
  } catch (error) {
    console.error("Error updating last name:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updateFirstName", verifyUser, async (req, res) => {
  const { fName } = req.body;
  const userId = req.user.id;
  const userType = req.user.userType;

  try {
    let updateQuery;
    if (userType === "Client") {
      updateQuery = "UPDATE `Client` SET `FirstName` = ? WHERE `ID` = ?";
    } else if (userType === "Delivery") {
      updateQuery = "UPDATE `Delivery` SET `FirstName` = ? WHERE `ID` = ?";
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    await db.promise().query(updateQuery, [fName, userId]);

    return res.status(200).json({ message: "First name updated successfully" });
  } catch (error) {
    console.error("Error updating first name:", error);
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
      const existingPhoneNumber = existingUser[0].PhoneNumber;
      if (existingPhoneNumber === phoneNumber) {
        return res
          .status(200)
          .json({ message: "Phone number is already up to date" });
      }

      return res
        .status(400)
        .json({ error: "Numer telefonu już istnieje w bazie danych" });
    }

    let updateQuery;
    if (userType === "Client") {
      updateQuery = "UPDATE `Client` SET `PhoneNumber` = ? WHERE `ID` = ?";
    } else if (userType === "Delivery") {
      updateQuery = "UPDATE `Delivery` SET `PhoneNumber` = ? WHERE `ID` = ?";
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
    let getPasswordQuery;
    if (userType === "Client") {
      getPasswordQuery = "SELECT * FROM `Client` WHERE `Email` = ?";
    } else if (userType === "Delivery") {
      getPasswordQuery = "SELECT * FROM `Delivery` WHERE `Email` = ?";
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    const [existingUser] = await db.promise().query(getPasswordQuery, [email]);

    if (
      existingUser &&
      existingUser.length > 0 &&
      existingUser[0].ID === userId
    ) {
      const existingEmail = existingUser[0].Email;
      if (existingEmail === email) {
        return res.status(400).json({
          error: "Nowy adres e-mail jest identyczny z aktualnym adresem e-mail",
        });
      }
    }

    let updateQuery;
    if (userType === "Client") {
      updateQuery = "UPDATE `Client` SET `Email` = ? WHERE `ID` = ?";
    } else if (userType === "Delivery") {
      updateQuery = "UPDATE `Delivery` SET `Email` = ? WHERE `ID` = ?";
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
    if (userType === "Client") {
      getPasswordQuery = "SELECT `Password` FROM `Client` WHERE `ID` = ?";
    } else if (userType === "Delivery") {
      getPasswordQuery = "SELECT `Password` FROM `Delivery` WHERE `ID` = ?";
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
          if (userType === "Client") {
            updatePasswordQuery =
              "UPDATE `Client` SET `Password` = ? WHERE `ID` = ?";
          } else if (userType === "Delivery") {
            updatePasswordQuery =
              "UPDATE `Delivery` SET `Password` = ? WHERE `ID` = ?";
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

app.get("/admin/client", async (req, res) => {
  try {
    const q = "SELECT * FROM Client";
    const data = await db.promise().query(q);
    const clients = data[0];

    // Wypisanie danych w konsoli
    console.log("Dane klientów:", clients);
    console.log("TESTSTST");
    return res.json({ clients });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: `Error fetching data: ${error.message}` });
  }
});

app.get("/admin/delivery", async (req, res) => {
  try {
    const q = "SELECT * FROM Delivery";
    const data = await db.promise().query(q);
    const delivery = data[0];

    // Wypisanie danych w konsoli
    console.log("Dane klientów:", delivery);
    console.log("TESTSTST");
    return res.json({ delivery });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: `Error fetching data: ${error.message}` });
  }
});

app.get("/admin/orders", async (req, res) => {
  try {
    const q = "SELECT * FROM `Order`";
    const data = await db.promise().query(q);
    const orders = data[0];
    return res.json({ orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching order data" });
  }
});

app.delete("/admin/client/:clientId", async (req, res) => {
  const { clientId } = req.params;

  try {
    // Check if the client exists
    const checkClientQuery = "SELECT * FROM Client WHERE ID = ?";
    const [existingClient] = await db
      .promise()
      .query(checkClientQuery, [clientId]);

    if (!existingClient || existingClient.length === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Delete the client
    const deleteClientQuery = "DELETE FROM Client WHERE ID = ?";
    await db.promise().query(deleteClientQuery, [clientId]);

    return res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/admin/:entityType/edit/:entityId", async (req, res) => {
  const { entityType, entityId } = req.params;
  console.log(`Requested ${entityType} ID:`, entityId);
  try {
    // Check if the entity exists
    const checkEntityQuery = `SELECT * FROM ${entityType} WHERE ID = ?`;
    const [existingEntity] = await db
      .promise()
      .query(checkEntityQuery, [entityId]);

    if (!existingEntity || existingEntity.length === 0) {
      return res.status(404).json({ error: `${entityType} not found` });
    }

    // Get entity data
    const getEntityQuery = `SELECT * FROM ${entityType} WHERE ID = ?`;
    const [entityData] = await db.promise().query(getEntityQuery, [entityId]);
    console.log(`Fetched ${entityType} Data:`, entityData[0]);

    return res.status(200).json({ [entityType]: entityData[0] });
  } catch (error) {
    console.error(`Error fetching ${entityType} data:`, error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/admin/:entityType/edit/:entityId", async (req, res) => {
  const { entityType, entityId } = req.params;
  const updatedEntityData = req.body;

  try {
    // Check if the entity exists
    const checkEntityQuery = `SELECT * FROM ${entityType} WHERE ID = ?`;
    const [existingEntity] = await db
      .promise()
      .query(checkEntityQuery, [entityId]);

    if (!existingEntity || existingEntity.length === 0) {
      return res.status(404).json({ error: `${entityType} not found` });
    }

    // Update entity data
    const updateEntityQuery = `UPDATE ${entityType} SET ? WHERE ID = ?`;
    await db.promise().query(updateEntityQuery, [updatedEntityData, entityId]);

    return res
      .status(200)
      .json({ message: `${entityType} data updated successfully` });
  } catch (error) {
    console.error(`Error updating ${entityType} data:`, error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/admin/delivery/:deliveryId", async (req, res) => {
  const { deliveryId } = req.params;

  try {
    const checkDeliveryQuery = "SELECT * FROM Delivery WHERE ID = ?";
    const [existingDelivery] = await db
      .promise()
      .query(checkDeliveryQuery, [deliveryId]);

    if (!existingDelivery || existingDelivery.length === 0) {
      return res.status(404).json({ error: "Delivery not found" });
    }

    const deleteDeliveryQuery = "DELETE FROM Delivery WHERE ID = ?";
    await db.promise().query(deleteDeliveryQuery, [deliveryId]);

    return res.status(200).json({ message: "Delivery deleted successfully" });
  } catch (error) {
    console.error("Error deleting delivery:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/admin/orders/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const checkOrderQuery = "SELECT * FROM `Order` WHERE ID = ?";
    const [existingOrder] = await db
      .promise()
      .query(checkOrderQuery, [orderId]);

    if (!existingOrder || existingOrder.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    const deleteOrderQuery = "DELETE FROM `Order` WHERE ID = ?";
    await db.promise().query(deleteOrderQuery, [orderId]);

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/delivery", verifyUser, async (req, res) => {
  const { orderId } = req.body;
  const { orderstatusid } = req.body;
  console.log(orderstatusid + "   " + orderId);
  try {
    const updateStatusQuery =
      "UPDATE `Order` SET `OrderStatusID` = ? WHERE `ID` = ?";
    await db.promise().query(updateStatusQuery, [orderstatusid, orderId]);

    return res
      .status(200)
      .json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/history", verifyUser, (req, res) => {
  const clientId = req.user.id;

  const q =
    "SELECT `Order`.*, OrderStatus.status FROM `Order` LEFT JOIN OrderStatus ON Order.OrderStatusID=OrderStatus.ID WHERE `ClientID` = ? AND Order.OrderStatusID = 5";

  db.query(q, [clientId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
});

app.get("/history", verifyUser, (req, res) => {
  const deliveryId = req.user.id;

  const q =
    "SELECT `Order`.*, OrderStatus.status FROM `Order` LEFT JOIN OrderStatus ON Order.OrderStatusID=OrderStatus.ID WHERE `DeliveryID` = ? AND Order.OrderStatusID = 5";

  db.query(q, [deliveryId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
});

app.post("/topup", verifyUser, (req, res) => {
  const { amount } = req.body;
  const clientId = req.user.id;
  //sprawdzenie czy amount jest liczbą dodatnia
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid top-up amount" });
  }

  const updateQuery =
    "UPDATE Wallet SET Balance = Balance + ? WHERE ClientID = ?";

  db.query(updateQuery, [amount, clientId], (err, data) => {
    if (err) {
      console.error("Error updating wallet balance:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    console.log("Wallet balance updated successfully");
    return res.json(data);
  });
});

app.get("/walletBalance", verifyUser, (req, res) => {
  const clientId = req.user.id;

  const selectQuery = "SELECT Balance FROM Wallet WHERE ClientID = ?";

  db.query(selectQuery, [clientId], (err, result) => {
    if (err) {
      console.error("Error fetching wallet balance:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ balance: 0 });
    }

    const walletBalance = result[0].Balance;
    return res.status(200).json({ balance: walletBalance });
  });
});

app.get("/wallet", verifyUser, (req, res) => {
  const deliveryId = req.user.id;

  const selectQuery = "SELECT Balance FROM DeliveryWallet WHERE DeliveryID = ?";

  db.query(selectQuery, [deliveryId], (err, result) => {
    if (err) {
      console.error("Error fetching wallet balance:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ balance: 0 });
    }

    const walletBalance = result[0].Balance;
    return res.status(200).json({ balance: walletBalance });
  });
});

app.post("/withdraw", verifyUser, (req, res) => {
  const deliveryId = req.user.id;

  const updateQuery =
    "UPDATE DeliveryWallet SET Balance = 0 WHERE DeliveryID = ?";

  db.query(updateQuery, [deliveryId], (err, data) => {
    if (err) {
      console.error("Error updating wallet balance:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    console.log("Wallet balance updated successfully");
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log("Backend");
});
