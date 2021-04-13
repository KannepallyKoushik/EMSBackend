const app = require("./app");
require("dotenv").config();

const port = process.env.PORT;
//Server Running
app.listen(port, () => {
  console.log("Server is running at port", port);
});
