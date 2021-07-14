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
    const { eid, event_type } = req.body;
    if (![eid, event_type].every(Boolean)) {
      return res.status(400).json("Missing Request Arguments");
    }
    if (!event_type.replace(/\s/g, "").length) {
      return res
        .status(400)
        .json("Request Attributes may contain empty Spaces");
    }
  }

  next();
};
