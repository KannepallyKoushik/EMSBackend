const router = require("express").Router();

const authorization = require("../middleware/authorization");
const dashValidators = require("../middleware/dashboardValidators");
const dashboardContoller = require("../controller/dashboardController");

// -----------------------------       GET Requests         -----------------------------------

router.get("/", authorization, dashboardContoller.getData);

router.get("/admin/", authorization, dashboardContoller.getAdminData);

router.get("/getDept", authorization, dashboardContoller.getDepartment);

router.get("/getFaculty", authorization, dashboardContoller.getFaculty);

router.get("/getCourses", authorization, dashboardContoller.getCourses);

router.get("/getCourse", authorization, dashboardContoller.getCourse);

router.get("/getBatches", authorization, dashboardContoller.getBatches);

// -----------------------------      POST Requests         -----------------------------------

router.post(
  "/admin/addDept",
  authorization,
  dashValidators,
  dashboardContoller.addDepartment
);

router.post(
  "/admin/addFaculty",
  authorization,
  dashValidators,
  dashboardContoller.addFaculty
);

router.post(
  "/admin/addCourse",
  authorization,
  dashValidators,
  dashboardContoller.addCourse
);

router.post(
  "/admin/addBatch",
  authorization,
  dashValidators,
  dashboardContoller.addBatch
);

router.post(
  "/setPassword",
  authorization,
  dashValidators,
  dashboardContoller.setPassword
);

router.post(
  "/admin/setEvent",
  authorization,
  dashValidators,
  dashboardContoller.setSubmissionDeadline
);

router.post(
  "/admin/RequestFeedback",
  authorization,
  dashValidators,
  dashboardContoller.publishRequestFeedback
);

module.exports = router;
