const router = require("express").Router();

const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
const authController = require("../controller/authController");

//1. Registering
router.post("/register", validInfo, authController.register);

//2. Login
router.post("/login", authController.login);

//3. Verifying token
router.get("/isverify", authorization, authController.verify);

module.exports = router;
