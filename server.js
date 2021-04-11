const express = require("express");
const app = express();
const cors = require("cors");

//Middlewares
app.use(express.json());
app.use(cors());

//ROUTES

//Server Running
app.listen(8000, () => {
  console.log("Server is running at port 8000");
});
