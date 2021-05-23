const router = require("express").Router();

const pool = require("../db");
const authorization = require("../middleware/authorization");
const dashboardContoller = require("../controller/dashboardController");

router.get("/", authorization, dashboardContoller.getData);

router.get("/admin/", authorization, dashboardContoller.getAdminData);

router.post("/admin/addDept", authorization, dashboardContoller.addDepartment);

router.post("/admin/addFaculty", authorization, dashboardContoller.addFaculty);

router.get("/getDept", authorization, dashboardContoller.getDepartment);

router.get("/getFaculty", authorization, dashboardContoller.getFaculty);

module.exports = router;
