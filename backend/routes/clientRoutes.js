const express = require("express");
const router = express.Router();
const db = require("../db");
const { verifyUser } = require('./authRoutes');


  
app.get("/home", verifyUser, async (req, res) => {
    if (req.user.Login) {
      try {
        // Fetch the wallet information based on the ClientID
        const walletQuery = await db
          .promise()
          .query("SELECT Balance FROM Wallet WHERE ClientID = ?", [req.user.ID]);
        const walletInfo = walletQuery[0][0];
  
        return res.json({
          valid: true,
          Login: req.user.Login,
          ID: req.user.ID.toString(),
          FirstName: req.user.FirstName,
          LastName: req.user.LastName,
          PhoneNumber: req.user.PhoneNumber,
          Email: req.user.Email,
          Password: req.user.Password,
          Balance: walletInfo ? walletInfo.Balance : 0,
        });
      } catch (error) {
        console.error("Error fetching wallet information:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      return res.json({ valid: false });
    }
  });

app.post("/home", verifyUser, (req, res) => {
    const clientId = req.user.ID;
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



app.get("/home/myorders", verifyUser, (req, res) => {
  const clientId = req.user.ID;

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




app.get("/home/history", verifyUser, (req, res) => {
    const clientId = req.user.ID;
  
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

  
  
app.post("/home/topup", verifyUser, (req, res) => {
    const { amount } = req.body;
    const clientId = req.user.ID;
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
  
  app.get("/home/walletBalance", verifyUser, (req, res) => {
    const clientId = req.user.ID;
  
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


  
app.get("/delivery/wallet", verifyUser, (req, res) => {
    const deliveryId = req.user.ID;
  
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
  
  app.post("/delivery/withdraw", verifyUser, (req, res) => {
    const deliveryId = req.user.ID;
  
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
  
  app.post("/home/updatewalletclient", verifyUser, async (req, res) => {
    const clientId = req.user.ID;
  
    const packageName = req.body.packageOption;
  
    const packageCostQuery = "SELECT Price FROM OrderDetails WHERE Name = ?";
  
    db.query(packageCostQuery, [packageName], async (err, result) => {
      if (err) {
        console.error("Error fetching package cost:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ error: "Package not found" });
      }
  
      const packageCost = result[0].Price;
      console.log(packageCost);
  
      // Retrieve wallet balance
      const selectQuery = "SELECT Balance FROM Wallet WHERE ClientID = ?";
      db.query(selectQuery, [clientId], async (err, result) => {
        if (err) {
          console.error("Error fetching wallet balance:", err);
          return res.json({ error: "Internal server error" });
        }
  
        if (result.length === 0) {
          return res.json({ error: "Wallet not found" });
        }
  
        const walletBalance = result[0].Balance;
  
        // Check if the wallet has sufficient balance
        if (walletBalance >= packageCost) {
          // Deduct amount from the wallet
          const newBalance = walletBalance - packageCost;
          const updateQuery = "UPDATE Wallet SET Balance = ? WHERE ClientID = ?";
          await db.promise().query(updateQuery, [newBalance, clientId]);
        } else {
          // Insufficient balance
          return res.json({ error: "Insufficient balance" });
        }
      });
    });
  });
  
  app.put("/delivery/updatewalletdelivery", verifyUser, async (req, res) => {
    const deliveryID = req.user.ID;
    const { orderId } = req.body;
    const { orderstatusid } = req.body;
  
    if (orderstatusid == "5") {
      const packageNameQuery =
        "SELECT OrderDetailsName FROM `Order` WHERE ID = ?";
  
      // Pobieranie nazwy paczki na podstawie orderId
      db.query(packageNameQuery, [orderId], async (nameErr, nameResult) => {
        if (nameErr || nameResult.length === 0) {
          res.status(500).send("Error fetching package name");
        } else {
          const packageName = nameResult[0].OrderDetailsName;
  
          // Pobieranie ceny paczki na podstawie jej nazwy
          const packageCostQuery =
            "SELECT Price FROM OrderDetails WHERE Name = ?";
          db.query(packageCostQuery, [packageName], async (err, result) => {
            if (err || result.length === 0) {
              res.status(500).send("Error fetching package cost");
            } else {
              const packageCost = result[0].Price;
              const comissionPrice = packageCost * 0.5;
  
              // Kod aktualizujący portfel kuriera w bazie danych
              const updateWalletQuery =
                "UPDATE DeliveryWallet SET Balance = Balance + ? WHERE DeliveryID = ?";
              db.query(
                updateWalletQuery,
                [comissionPrice, deliveryID],
                (walletErr, walletResult) => {
                  if (walletErr) {
                    res.status(500).send("Error updating courier's wallet");
                  } else {
                    res.status(200).send("Courier's wallet updated successfully");
                  }
                }
              );
            }
          });
        }
      });
    }
  });
  
  app.post("/home/rateOrder", verifyUser, async (req, res) => {
    const { orderId, orderRate } = req.body;
  
    try {
      const checkOrderQuery = "SELECT * FROM `Order` WHERE ID = ?";
      const [existingOrder] = await db
        .promise()
        .query(checkOrderQuery, [orderId]);
  
      if (!existingOrder || existingOrder.length === 0) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      const addRatingQuery =
        "INSERT INTO Rate (OrderID, OrderRate) VALUES (?, ?)";
      await db.promise().query(addRatingQuery, [orderId, orderRate]);
  
      return res.status(200).json({ message: "Order rated successfully" });
    } catch (error) {
      console.error("Error rating order:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });




  app.post("/:end/verify-password", verifyUser, async (req, res) => {
    try {
      const userId = req.user.ID;
      const { OldPassword } = req.body;
      console.log(userId);
  
      const getUserQuery = "SELECT Password FROM Client WHERE ID = ?";
      const [userData] = await db.promise().query(getUserQuery, userId);
      console.log("Baza: " + userData[0].Password);
      console.log("OLD: " + OldPassword);
  
      const isOldPasswordCorrect = await bcrypt.compare(
        OldPassword,
        userData[0].Password
      );
  
      return res.status(200).json({ valid: isOldPasswordCorrect });
    } catch (error) {
      console.error("Error verifying old password:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.put("/:end/update", verifyUser, async (req, res) => {
    const userId = req.user.ID;
    const { end } = req.params;
    const updatedEntityData = req.body;
    let entityType = "";
  
    if (end === "home") {
      entityType = "Client";
    } else {
      entityType = "Delivery";
    }
    console.log(updatedEntityData);
    try {
      // Check if the entity exists
      const checkEntityQuery = `SELECT * FROM ${entityType} WHERE ID = ?`;
      const [existingEntity] = await db.promise().query(checkEntityQuery, userId);
  
      if (!existingEntity || existingEntity.length === 0) {
        return res.status(404).json({ error: `${entityType} not found` });
      }
  
      // Update the entity data
      const updateEntityQuery = `UPDATE ${entityType} SET ? WHERE ID = ?`;
      let updateData = { ...updatedEntityData };
  
      // Hash the new password before updating, only if provided
      if (updateData.Password) {
        const saltRounds = 10;
        updateData.Password = await bcrypt.hash(updateData.Password, saltRounds);
      }
  
      await db.promise().query(updateEntityQuery, [updateData, userId]);
  
      return res
        .status(200)
        .json({ message: `${entityType} data updated successfully` });
    } catch (error) {
      console.error(`Error updating ${entityType} data:`, error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  



module.exports = router;