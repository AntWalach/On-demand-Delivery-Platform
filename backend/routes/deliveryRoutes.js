const express = require("express");
const router = express.Router();
const db = require("../db");
const { verifyUser } = require('./authRoutes');


app.get("/delivery", verifyUser, (req, res) => {
    if (req.user.Login) {
      return res.json({
        valid: true,
        Login: req.user.Login,
        ID: req.user.ID.toString(),
        FirstName: req.user.FirstName,
        LastName: req.user.LastName,
        PhoneNumber: req.user.PhoneNumber,
        Email: req.user.Email,
        Password: req.user.Password,
      });
    } else {
      return res.json({ valid: false });
    }
  });




  app.get("/delivery/orders", verifyUser, (req, res) => {
    const deliveryId = req.user.ID;
  
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
    const deliveryId = req.user.ID;
  
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
    const deliveryId = req.user.ID;
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

  app.get("/delivery/historyd", verifyUser, (req, res) => {
    const deliveryId = req.user.ID;
  
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



  app.post("/delivery/addWageHistory", verifyUser, (req, res) => {
    console.log("TEST")
    const deliveryId = req.user.ID;
    const { BankAccountNumber, AmountWage, PayDate} = req.body;
  
    const sql =
      "INSERT INTO WageHistory (BankAccountNumber, AmountWage, PayDate, DeliveryID) VALUES (?, ?, ?, ?)";
    const values = [BankAccountNumber, AmountWage, PayDate, deliveryId];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Błąd przy dodawaniu do WithdrawalHistory:", err);
        res
          .status(500)
          .json({
            success: false,
            message: "Błąd przy dodawaniu do WithdrawalHistory",
          });
      } else {
        res
          .status(200)
          .json({
            success: true,
            message: "Dodano do WithdrawalHistory",
            withdrawalID: result.insertId,
          });
      }
    });
  });
  
  app.get("/delivery/withdrawalHistory", verifyUser, (req, res) => {
    const deliveryId = req.user.ID;
    const sql = "SELECT * FROM WageHistory WHERE DeliveryID = ?";
  
    db.query(sql, [deliveryId], (err, results) => {
      if (err) {
        console.error("Błąd przy pobieraniu historii wypłat:", err);
        res
          .status(500)
          .json({
            success: false,
            message: "Błąd przy pobieraniu historii wypłat",
          });
      } else {
        res.status(200).json(results);
      }
    });
  });
module.exports = router;