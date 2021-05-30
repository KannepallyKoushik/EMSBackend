const enivironment = require("dotenv").config;
const bcrypt = require("bcrypt");
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

      const dept = await pool.query(
        "select * from department where dep_id= $1",
        [depID]
      );

      if (dept.rowCount === 0) {
        return res
          .status(400)
          .json("Sorry no Department such department Exists to add Faculty");
      }

      const fac = await pool.query(
        "select * from faculty where fac_email = $1",
        [facEmail]
      );

      if (fac.rowCount != 0) {
        return res.status(405).send("Faculty with this email Already Exists");
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

exports.addCourse = async (req, res) => {
  try {
    if (req.role == "admin") {
      const { courseCode, courseName, depID } = req.body;

      const course = await pool.query(
        "select * from course where c_code = $1",
        [courseCode]
      );

      if (course.rowCount != 0) {
        return res.status(405).send("Course Already exists");
      }

      await pool.query(
        "Insert into course(c_code,cname,dep_id) values($1,$2,$3)",
        [courseCode, courseName, depID]
      );

      res.status(201).send("Course Added Successfully");
    } else {
      res.status(403).json("Not Authorise");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await pool.query("select * from course");

    return res.status(201).json(courses.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getCourse = async (req, res) => {
  try {
    const { depID } = req.body;
    const courses = await pool.query("select * from course where dep_id = $1", [
      depID,
    ]);

    return res.status(201).json(courses.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.addBatch = async (req, res) => {
  try {
    if (req.role == "admin") {
      const { batchIn, batchOut } = req.body;

      const batch = await pool.query(
        "select * from batch where pass_in = $1 and pass_out=$2",
        [batchIn, batchOut]
      );

      if (batch.rowCount != 0) {
        return res.status(405).send("Batch Already exists");
      }

      await pool.query("Insert into batch(pass_in,pass_out) values($1,$2)", [
        batchIn,
        batchOut,
      ]);

      res.status(201).send("Batch Added Successfully");
    } else {
      res.status(403).json("Not Authorised");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getBatches = async (req, res) => {
  try {
    const batches = await pool.query("select * from batch");

    return res.status(201).json(batches.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.setPassword = async (req, res) => {
  try {
    const userID = req.user;
    const role = req.role;
    const { oldPassword, newPassword } = req.body;

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptNewPassword = await bcrypt.hash(newPassword, salt);

    if (role == "admin") {
      const checkpwd = await pool.query(
        "select * from admin where ad_id = $1",
        [userID]
      );

      const validPassword = await bcrypt.compare(
        oldPassword,
        checkpwd.rows[0].password
      );

      if (!validPassword) {
        return res
          .status(403)
          .json("Not Authorised,Please check your old password");
      }

      await pool.query("UPDATE admin SET password=$1 where ad_id=$2", [
        bcryptNewPassword,
        userID,
      ]);
      res.status(201).send("Succesfully Changed Password");
    } else if (role == "student") {
      const checkpwd = await pool.query(
        "select * from users where userid = $1",
        [userID]
      );

      const validPassword = await bcrypt.compare(
        oldPassword,
        checkpwd.rows[0].user_password
      );

      if (!validPassword) {
        return res
          .status(403)
          .json("Not Authorised,Please check your old password");
      }

      await pool.query("UPDATE users SET user_password=$1 where userid=$2", [
        bcryptNewPassword,
        userID,
      ]);
      res.status(201).send("Succesfully Changed Password");
    } else {
      res.status(403).json("Not Authorised");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.setSubmissionDeadline = async (req, res) => {
  try {
    const { eventDescription, batchID, depID, deadline, courses } = req.body;

    if (req.role == "admin") {
      const batch = await pool.query("select * from batch where batch_id=$1", [
        batchID,
      ]);
      if (batch.rowCount == 0) {
        return res
          .status(400)
          .json("There is so Batch for which is event is requested to create");
      }

      const dept = await pool.query(
        "select * from department where dep_id=$1",
        [depID]
      );
      if (dept.rowCount == 0) {
        return res
          .status(400)
          .json(
            "There is no Depatment for which event is requested to be created"
          );
      }

      for (const element of courses) {
        const course = await pool.query("select * from course where cid=$1", [
          element.course_id,
        ]);
        const faculty = await pool.query(
          "select * from faculty where fac_id=$1",
          [element.fac_id]
        );
        if (course.rowCount === 0) {
          return res
            .status(400)
            .json(
              `Requested course ${element.course_id} is Not present in Database`
            );
        }
        if (faculty.rowCount === 0) {
          return res
            .status(400)
            .json(
              `Requested faculty ${element.fac_id} is Not present in Database`
            );
        }
      }

      const event = await pool.query(
        "Insert into event(ev_name,dep_id,ev_deadline,batch_id) values($1,$2,$3,$4)  RETURNING eid",
        [eventDescription, depID, deadline, batchID]
      );
      const event_id = event.rows[0].eid;

      for (const element of courses) {
        await pool.query(
          "Update course set fac_id = $1,offered=$2,eid=$3 where cid=$4",
          [element.fac_id, true, event_id, element.course_id]
        );
      }

      res.status(201).send("Successfully added event");
    } else {
      res.status(403).json("Not Authorise");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.publishRequestFeedback = async (req, res) => {
  try {
    if (req.role == "admin") {
      const { eventDescription, depID, batchID, deadline } = req.body;

      const batch = await pool.query("select * from batch where batch_id=$1", [
        batchID,
      ]);
      if (batch.rowCount == 0) {
        return res
          .status(400)
          .json("There is so Batch for which is event is requested to create");
      }

      const dept = await pool.query(
        "select * from department where dep_id=$1",
        [depID]
      );
      if (dept.rowCount == 0) {
        return res
          .status(400)
          .json(
            "There is no Depatment for which event is requested to be created"
          );
      }

      await pool.query(
        "Insert into event(ev_name,dep_id,ev_deadline,batch_id) values($1,$2,$3,$4)",
        [eventDescription, depID, deadline, batchID]
      );

      res.status(201).send("Successfully added event");
    } else {
      res.status(403).json("Not Authorise");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
