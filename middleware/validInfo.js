module.exports = function (req, res, next) {
  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    const { email, name, password } = req.body;
    if (![email, name, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login" || req.path === "/admin/login") {
    const { email, password } = req.body;
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    }
  } else if (req.path === "/report") {
    const { name, email, message } = req.body;
    if (![name, email, message].every(Boolean)) {
      return res.status(400).json("Missing Aruments");
    }
    if (!validEmail(email)) {
      return res.status(400).json("Invalid Email");
    }
    if (!name.replace(/\s/g, "").length || !message.replace(/\s/g, "").length) {
      return res
        .status(400)
        .json("Request Attributes may contain empty Spaces");
    }
  } else if (req.path === "/forgotpassword") {
    const { email } = req.body;
    if (![email].every(Boolean)) {
      return res.status(400).json("Missing Credentials");
    }
    if (!validEmail(email)) {
      return res.status(400).json("Invalid Email");
    }
  } else if (req.path === "/changePassword") {
    const { encryptedID, password } = req.body;
    if (![encryptedID, password].every(Boolean)) {
      return res.status(400).json("Missing Credentials");
    }
    if (
      !encryptedID.replace(/\s/g, "").length ||
      !password.replace(/\s/g, "").length
    ) {
      return res
        .status(400)
        .json("Request Credentials may contain empty Spaces");
    }
  }
  next();
};
