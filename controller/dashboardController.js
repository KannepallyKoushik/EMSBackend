const enivironment = require("dotenv").config;

const pool = require("../db");

exports.getData = async (req, res) => {
  try {
    const role = req.role;
    const userid = req.user;
    if (role == "student") {
      const user = await pool.query(
        "Select userid,username,user_email,dep_id,mobile,batch_id from users where userid = $1",
        [userid]
      );
      res.status(200).json(user.rows[0]);
    } else {
      res.status(200).json(admin.rows[0]);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getAdminData = async (req, res) => {
  try {
    const role = req.role;
    const userid = req.user;
    if (role == "admin") {
      const admin = await pool.query(
        "Select ad_id,ad_email from admin where ad_id = $1",
        [userid]
      );
      res.status(200).json(admin.rows[0]);
    } else {
      res.status(403).json("Not Authorise");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
