module.exports = function (req, res, next) {
  function validMobile(mobNum) {
    return /^\d{10}$/.test(mobNum);
  }

  if (req.path == "/updateProfile") {
    const { batchID, branchID, mobNumber, address } = req.body;
    if (![batchID, branchID, mobNumber, address].every(Boolean)) {
      return res.status(400).json("Missing Request Arguments");
    }
    if (
      !mobNumber.replace(/\s/g, "").length ||
      !address.replace(/\s/g, "").length
    ) {
      return res
        .status(400)
        .json("Request Attributes may contain empty Spaces");
    }
    if (!validMobile(mobNumber)) {
      return res.status(400).json("Invalid Mobile Number");
    }
  }

  if (req.path == "/getNotification") {
    const { depID, batchID } = req.body;
    if (![depID, batchID].every(Boolean)) {
      return res.status(400).json("Missing Request Arguments");
    }
  }

  if (req.path == "/getPastNotification") {
    const { depID, batchID } = req.body;
    if (![depID, batchID].every(Boolean)) {
      return res.status(400).json("Missing Request Arguments");
    }
  }

  if (req.path == "/getEventData") {
    const { eid } = req.body;
    if (![eid].every(Boolean)) {
      return res.status(400).json("Missing Request Arguments");
    }
  }

  if (req.path == "/submitPreferences") {
    const { totalCredits, courseset, batchID } = req.body;
    if (![totalCredits, courseset, batchID].every(Boolean)) {
      return res.status(400).json("Missing Request Arguments");
    }
  }

  if (req.path == "/postFeedback") {
    const { feedback, course_id, batchID } = req.body;
    if (![feedback, course_id, batchID].every(Boolean)) {
      return res.status(400).json("Missing Request Arguments");
    }
    if (!feedback.replace(/\s/g, "").length) {
      return res
        .status(400)
        .json("Request Attributes may contain empty Spaces");
    }
  }

  if (req.path == "/getFeedback") {
    const { course_id } = req.body;
    if (![course_id].every(Boolean)) {
      return res.status(400).json("Missing Request Arguments");
    }
  }

  next();
};
