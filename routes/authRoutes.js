const router = require("express").Router();

const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
const authController = require("../controller/authController");

//1. Registering
router.post("/register", validInfo, authController.register);

//2. Login
router.post("/login", validInfo, authController.login);

//3. Admin Login
router.post("/admin/login", validInfo, authController.adminLogin);

//3. Verifying token
router.post("/isverify", authorization, authController.verify);

//4. Reporting Issue to Admin
router.post("/report", authController.report);

//4. ForgotPassword
router.post("/forgotpassword", authController.forgotPassword);

//5. Change Password
router.post("/changePassword", authController.changePassword);

//6. Verify Email
router.post("/verifyEmail", authController.verifyEmail);

module.exports = router;
