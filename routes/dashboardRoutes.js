const router = require("express").Router();

const authorization = require("../middleware/authorization");
const dashboardContoller = require("../controller/dashboardController");

router.get("/", authorization, dashboardContoller.getData);

router.get("/admin/", authorization, dashboardContoller.getAdminData);

router.post("/admin/addDept", authorization, dashboardContoller.addDepartment);

router.post("/admin/addFaculty", authorization, dashboardContoller.addFaculty);

router.post("/admin/addCourse", authorization, dashboardContoller.addCourse);

router.post("/admin/addBatch", authorization, dashboardContoller.addBatch);

router.get("/getDept", authorization, dashboardContoller.getDepartment);

router.get("/getFaculty", authorization, dashboardContoller.getFaculty);

router.get("/getCourses", authorization, dashboardContoller.getCourses);

module.exports = router;
