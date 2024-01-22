const express = require("express");
const router = express.Router();
const db = require("../db")
const { verifyUser } = require('./authRoutes');



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
module.exports = router;