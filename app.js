const express = require("express");
const app = express();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

//Middlewares
app.use(express.json());
app.use(cors());

//ROUTES

// 1. Register and login Routes
app.use("/auth", authRoutes);

//2. Application Routes
app.use("/dashboard", dashboardRoutes);

module.exports = app;
