const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

//Middlewares
app.use(express.json());
app.use(cors());

//ROUTES

// 1. Register and login Routes
app.use("/auth", authRoutes);

module.exports = app;
