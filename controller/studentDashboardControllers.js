const pool = require("../db");

exports.getData = async (req, res) => {
  try {
    const role = req.role;
    const userid = req.user;
    if (role == "student") {
      const user = await pool.query(
        "Select userid,username,user_email,dep_id,mobile,batch_id,address from users where userid = $1",
        [userid]
      );
      res.status(200).json(user.rows[0]);
    } else {
      res.status(403).json("Not Authorized.");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getNotification = async (req, res) => {
  try {
    const role = req.role;

    if (role == "student") {
      const { depID, batchID } = req.body;

      var today = new Date();
      const date = formatDate(today);

      const data = await pool.query(
        "select * from event where dep_id=$1 and batch_id=$2 and ev_deadline >= $3",
        [depID, batchID, date]
      );

      return res.status(200).json(data.rows);
    } else {
      return res.status(403).json("Not Authorized.");
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

exports.getPastNotification = async (req, res) => {
  try {
    const role = req.role;

    if (role == "student") {
      const { depID, batchID } = req.body;

      var today = new Date();
      const date = formatDate(today);

      const data = await pool.query(
        "select * from event where dep_id=$1 and batch_id=$2 and ev_deadline < $3",
        [depID, batchID, date]
      );

      return res.status(200).json(data.rows);
    } else {
      return res.status(403).json("Not Authorized.");
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const role = req.role;
    const userid = req.user;

    if (role == "student") {
      const { batchID, branchID, mobNumber, address } = req.body;

      await pool.query(
        "update users set dep_id = $1 , batch_id = $2 , mobile = $3 , address = $4 where userid = $5",
        [batchID, branchID, mobNumber, address, userid]
      );

      const user = await pool.query(
        "Select userid,username,user_email,dep_id,mobile,batch_id,address from users where userid = $1",
        [userid]
      );
      res.status(200).json(user.rows[0]);
    } else {
      res.status(403).json("Not Authorized.");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getEventData = async (req, res) => {
  try {
    const role = req.role;

    if (role == "student") {
      const { eid } = req.body;

      const eventData = await pool.query("select * from event where eid = $1", [
        eid,
      ]);

      if (eventData.rows[0].event_type == "electives") {
        const data = await pool.query(
          "Select course.cid, course.c_code, course.cname, faculty.facname, faculty.fac_email ,course.cdescription, course.course_credit, course.demo_link from course left join faculty on course.fac_id = faculty.fac_id where eid=$1",
          [eid]
        );
        res.status(200).json(data.rows);
      } else if (eventData.rows[0].event_type == "feedback") {
        const data = await pool.query(
          "Select course.cid, course.c_code, course.cname, faculty.facname from course left join faculty on course.fac_id = faculty.fac_id where eid=$1",
          [eid]
        );
        res.status(200).json(data.rows);
      }
    } else {
      res.status(403).json("Not Authorized.");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.submitPreferences = async (req, res) => {
  try {
    if (req.role == "student") {
      const { totalCredits, courseset, batchID, deptID } = req.body;
      var credits = 0;
      for (const item of courseset) {
        credits += item.course_credit;
      }
      if (credits != totalCredits) {
        return res
          .status(400)
          .json("Subjects seleted should tally with Total Credits requirement");
      } else {
        for (const item of courseset) {
          await pool.query(
            "Insert into approvedcourse(cid,userid,fac_id,dep_id,batch_id) values($1,$2,$3,$4,$5)",
            [item.cid, req.user, item.fac_id, deptID, batchID]
          );
        }
        return res.status(200).send("Sucessfully Updated Preferences");
      }
    } else {
      res.status(403).json("Not Authorized.");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.postFeedback = async (req, res) => {
  try {
    if (req.role == "student") {
      const { feedback, course_id, batchID } = req.body;

      await pool.query(
        "Insert into feedback(feedback,cid,batch_id,userid) values($1,$2,$3,$4)",
        [feedback, course_id, batchID, req.user]
      );
      return res.status(200).send("successfull posted your feedback");
    } else {
      res.status(403).json("Not Authorized.");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getFeedback = async (req, res) => {
  try {
    if (req.role == "student") {
      const { course_id } = req.body;

      const data = await pool.query(
        "select feedback , pass_in , pass_out  from feedback left join batch on feedback.batch_id = batch.batch_id where cid = $1",
        [course_id]
      );
      return res.status(200).json(data.rows);
    } else {
      res.status(403).json("Not Authorized.");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getApprovedCourses = async (req, res) => {
  try {
    if (req.role == "student") {
      const user_id = req.user;

      const data = await pool.query(
        "Select course.c_code , course.cname from approvedcourse left join course on approvedcourse.cid = course.cid where userid = $1",
        [user_id]
      );
      res.status(200).json(data.rows);
    } else {
      res.status(403).json("Not Authorized.");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// ----------------------- Other usefull Functions -------------------------

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
