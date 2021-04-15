const router = require("express").Router();

const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
const authController = require("../controller/authController");

//1. Registering
router.post("/register", validInfo, authController.register);

//2. Login
router.post("/login", authController.login);

//3. Verifying token
router.post("/isverify", authorization, authController.verify);

//4. Reporting Issue to Admin
router.post("/report", authController.report);

//4. ForgotPassword
router.post("/forgotpassword", authController.forgotPassword);

module.exports = router;
