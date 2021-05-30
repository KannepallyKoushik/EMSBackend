module.exports = function (req, res, next) {
  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path == "/admin/addDept") {
    const { deptName } = req.body;
    if (![deptName].every(Boolean)) {
      return res.status(400).json("Missing Request Arguments");
    }
    if (!deptName.replace(/\s/g, "").length) {
      return res
        .status(400)
        .json("Request Attributes may contain empty Spaces");
    }
  }

  if (req.path == "/admin/addFaculty") {
    const { facName, depID, facEmail } = req.body;
    if (![facName, depID, facEmail].every(Boolean)) {
      return res.status(400).json("Missing Request Arguments");
    }
    if (
      !facName.replace(/\s/g, "").length ||
      !facEmail.replace(/\s/g, "").length
    ) {
      return res
        .status(400)
        .json("Request Attributes may contain empty Spaces");
    }
    if (!validEmail(facEmail)) {
      return res.status(400).json("Invalid Email for Faculty");
    }
  }

  if (req.path == "/admin/addCourse") {
    const { courseCode, courseName, depID } = req.body;
    if (![courseCode, courseName, depID].every(Boolean)) {
      return res.status(400).json("Missing Request Arguments");
    }
    if (
      !courseCode.replace(/\s/g, "").length ||
      !courseName.replace(/\s/g, "").length
    ) {
      return res
        .status(400)
        .json("Request Attributes may contain empty Spaces");
    }
  }

  if (req.path == "/admin/addBatch") {
    const { batchIn, batchOut } = req.body;
    if (![batchIn, batchOut].every(Boolean)) {
      return res.status(400).json("Missing Request Arguments");
    }

    if (batchIn == batchOut) {
      return res
        .status(400)
        .json("Admission and Passout cannot be in same year.");
    }

    if (batchIn > batchOut) {
      return res.status(400).json("Admission should be before Passing out.");
    }

    if (batchOut - batchIn > 6) {
      return res.status(405).json("Course cannot be more than 6 years.");
    }
  }

  if (req.path == "/setPassword") {
    const { oldPassword, newPassword } = req.body;
    if (![oldPassword, newPassword].every(Boolean)) {
      return res.status(400).json("Missing Request Arguments");
    }
    if (
      !oldPassword.replace(/\s/g, "").length ||
      !newPassword.replace(/\s/g, "").length
    ) {
      return res
        .status(400)
        .json("Request Attributes may contain empty Spaces");
    }
  }

  if (req.path == "/admin/setEvent") {
    const { eventDescription, batchID, depID, deadline, courses } = req.body;
    if (![eventDescription, batchID, depID, deadline, courses].every(Boolean)) {
      return res.status(400).json("Missing Request Arguments");
    }
    if (
      !eventDescription.replace(/\s/g, "").length ||
      !deadline.replace(/\s/g, "").length
    ) {
      return res
        .status(400)
        .json("Request Attributes may contain empty Spaces");
    }
    if (typeof courses !== "undefined" && courses.length === 0) {
      return res
        .status(400)
        .json("List of courses to Create an Event are missing");
    }
    for (const element of courses) {
      if (![element.course_id, element.fac_id].every(Boolean)) {
        return res.status(400).json("Missing Arguments of Courses");
      }
    }
  }

  if (req.path == "/admin/RequestFeedback") {
    const { eventDescription, depID, batchID, deadline } = req.body;
    if (![eventDescription, depID, batchID, deadline].every(Boolean)) {
      return res.status(400).json("Missing Request Arguments");
    }
    if (
      !eventDescription.replace(/\s/g, "").length ||
      !deadline.replace(/\s/g, "").length
    ) {
      return res
        .status(400)
        .json("Request Attributes may contain empty Spaces");
    }
  }

  next();
};
