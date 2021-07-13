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
        "update user set dep_id = $1 , batch_id = $2 , mobile = $3 , address = $4 where userid = $",
        [batchID, branchID, mobNumber, address]
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

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
