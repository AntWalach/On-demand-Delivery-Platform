// db.js
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "sql.freedb.tech",
  user: "freedb_baanma",
  password: "@$ZUya6*hUJTs89",
  database: "freedb_deliveryappdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  authPlugins: {
    mysql_native_password: () => require("mysql2/lib/auth/mysql_native_password"),
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

module.exports = db;
