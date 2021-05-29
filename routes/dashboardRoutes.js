const router = require("express").Router();

const authorization = require("../middleware/authorization");
const dashboardContoller = require("../controller/dashboardController");

router.get("/", authorization, dashboardContoller.getData);

router.get("/admin/", authorization, dashboardContoller.getAdminData);

router.post("/admin/addDept", authorization, dashboardContoller.addDepartment);

router.post("/admin/addFaculty", authorization, dashboardContoller.addFaculty);

router.post("/admin/addCourse", authorization, dashboardContoller.addCourse);

router.post("/admin/addBatch", authorization, dashboardContoller.addBatch);

router.post(
  "/admin/setEvent",
  authorization,
  dashboardContoller.setSubmissionDeadline
);

router.post("/setPassword", authorization, dashboardContoller.setPassword);

router.get("/getDept", authorization, dashboardContoller.getDepartment);

router.get("/getFaculty", authorization, dashboardContoller.getFaculty);

router.get("/getCourses", authorization, dashboardContoller.getCourses);

router.get("/getCourse", authorization, dashboardContoller.getCourse);

router.get("/getBatches", authorization, dashboardContoller.getBatches);

router.post(
  "/RequestFeedback",
  authorization,
  dashboardContoller.publishRequestFeedback
);

module.exports = router;
