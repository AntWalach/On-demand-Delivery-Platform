const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoutes = require("./authRoutes");
const clientRoutes = require("./clientRoutes");
const deliveryRoutes = require("./deliveryRoutes");
const adminRoutes = require("./adminRoutes");



const app = express();
const PORT = 8081;

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

app.use("/auth", authRoutes);
app.use("/home", clientRoutes);
app.use("/delivery", deliveryRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});