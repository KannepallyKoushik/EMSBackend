const router = require("express").Router();

const pool = require("../db");
const authorization = require("../middleware/authorization");
const dashboardContoller = require("../controller/dashboardController");

router.get("/", authorization, dashboardContoller.getData);

router.get("/admin/", authorization, dashboardContoller.getAdminData);

module.exports = router;
