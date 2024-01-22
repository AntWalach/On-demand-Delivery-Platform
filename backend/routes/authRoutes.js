const express = require("express");
const router = express.Router();
const db = require("../db");


const jwt = require('jsonwebtoken');


app.post("/signup", (req, res) => {
    bcrypt.hash(req.body.Password.toString(), salt, (err, hash) => {
      if (err) return res.json({ Error: "Error for hashing password" });
      const values = [
        req.body.Login,
        req.body.FirstName,
        req.body.LastName,
        req.body.PhoneNumber,
        req.body.Email,
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
    const { userType, Email, Password } = req.body;
  
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
  
    const values = [Email];
  
    db.query(query, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Error: "Internal Server Error" });
      }
  
      if (data.length > 0) {
        bcrypt.compare(Password.toString(), data[0].Password, (err, response) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ Error: "Internal Server Error" });
          }
  
          if (response) {
            const {
              Login,
              ID,
              FirstName,
              LastName,
              Email,
              PhoneNumber,
              Password,
            } = data[0];
            const userType = table;
  
            const token = jwt.sign(
              {
                Login: Login,
                ID: ID,
                FirstName: FirstName,
                LastName: LastName,
                Email: Email,
                PhoneNumber: PhoneNumber,
                userType: userType,
                Password: Password,
              },
              "jwt-secret-key",
              { expiresIn: "1d" }
            );
  
            res.cookie("token", token);
  
            return res.json({
              login: true,
              Login: Login,
              ID: ID,
              userType: userType,
              FirstName: FirstName,
              LastName: LastName,
              Email: Email,
              PhoneNumber: PhoneNumber,
              Password: Password,
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
          const userType = req.user.userType;
          console.log("Auth User - " + userType);
  
          if (
            (req.path.startsWith("/delivery") && userType === "Delivery") ||
            (req.path.startsWith("/home") && userType === "Client")
          ) {
            next();
          } else {
            res.json({ Error: "Unauthorized access" });
          }
        }
      });
    }
  };


module.exports = router;