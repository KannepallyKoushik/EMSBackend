const router = require("express").Router();

const authorization = require("../middleware/authorization");
const dashValidators = require("../middleware/dashboardValidators");
const adminDashboardContoller = require("../controller/dashboardController");
const studentDashboardContoller = require("../controller/studentDashboardControllers");
const studentDashValidators = require("../middleware/studentDashboardValidators");

// -----------------------------       GET Requests         -----------------------------------

router.get("/", authorization, studentDashboardContoller.getData);

router.get(
  "/getApprovedCourses",
  authorization,
  studentDashboardContoller.getApprovedCourses
);

router.get("/admin/", authorization, adminDashboardContoller.getAdminData);

router.get("/getDept", authorization, adminDashboardContoller.getDepartment);

router.get("/getFaculty", authorization, adminDashboardContoller.getFaculty);

router.get("/getCourses", authorization, adminDashboardContoller.getCourses);

router.get("/getBatches", authorization, adminDashboardContoller.getBatches);

// -----------------------------      POST Requests         -----------------------------------

// 1.Admin Related Posts Requests
router.post(
  "/admin/addDept",
  authorization,
  dashValidators,
  adminDashboardContoller.addDepartment
);

router.post(
  "/admin/addFaculty",
  authorization,
  dashValidators,
  adminDashboardContoller.addFaculty
);

router.post(
  "/admin/addCourse",
  authorization,
  dashValidators,
  adminDashboardContoller.addCourse
);

router.post(
  "/admin/addBatch",
  authorization,
  dashValidators,
  adminDashboardContoller.addBatch
);

router.post(
  "/admin/setEvent",
  authorization,
  dashValidators,
  adminDashboardContoller.setSubmissionDeadline
);

router.post(
  "/admin/RequestFeedback",
  authorization,
  dashValidators,
  adminDashboardContoller.publishRequestFeedback
);

// 2.Common to Admin and Student Related Posts Requests
router.post(
  "/setPassword",
  authorization,
  dashValidators,
  adminDashboardContoller.setPassword
);

router.post(
  "/getCourse",
  authorization,
  dashValidators,
  adminDashboardContoller.getCourse
);

// 3.Student Related Posts Requests
router.post(
  "/updateProfile",
  authorization,
  studentDashValidators,
  studentDashboardContoller.updateProfile
);

router.post(
  "/getNotification",
  authorization,
  studentDashValidators,
  studentDashboardContoller.getNotification
);

router.post(
  "/getPastNotification",
  authorization,
  studentDashValidators,
  studentDashboardContoller.getPastNotification
);

router.post(
  "/getEventData",
  authorization,
  studentDashValidators,
  studentDashboardContoller.getEventData
);

router.post(
  "/submitPreferences",
  authorization,
  studentDashboardContoller.submitPreferences
);

router.post(
  "/getFeedback",
  authorization,
  studentDashboardContoller.getFeedback
);

router.post(
  "/postFeedback",
  authorization,
  studentDashboardContoller.postFeedback
);

module.exports = router;
