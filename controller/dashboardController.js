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

exports.addDepartment = async (req, res) => {
  try {
    if (req.role == "admin") {
      //1.Destructure body
      const { deptName } = req.body;

      //2.Check if Dept is already Present
      const dept = await pool.query(
        "select * from department where dep_name = $1",
        [deptName]
      );

      if (dept.rowCount != 0) {
        return res.status(405).send("Department Already exists");
      }

      await pool.query("Insert into department(dep_name) values($1)", [
        deptName,
      ]);

      res.status(201).send("Department Added Successfully");
    } else {
      res.status(403).json("Not Authorise");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getDepartment = async (req, res) => {
  try {
    const dept = await pool.query("select * from department");

    return res.status(201).json(dept.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.addFaculty = async (req, res) => {
  try {
    if (req.role == "admin") {
      const { facName, depID, facEmail } = req.body;

      const fac = await pool.query(
        "select * from faculty where fac_email = $1",
        [facEmail]
      );

      if (fac.rowCount != 0) {
        return res.status(405).send("Department Already exists");
      }

      await pool.query(
        "Insert into faculty(facname,dep_id,fac_email) values($1,$2,$3)",
        [facName, depID, facEmail]
      );

      res.status(201).send("Faculty Added Successfully");
    } else {
      res.status(403).json("Not Authorise");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getFaculty = async (req, res) => {
  try {
    const fac = await pool.query("select * from faculty");

    return res.status(201).json(fac.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
