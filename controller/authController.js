const bcrypt = require("bcrypt");

const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");

exports.register = async (req, res) => {
  try {
    //1. Destructure the req.body (name, email , password)
    const { name, email, password, role } = req.body;

    //2. Check if user exists (if user exist then throw error)
    const user = await pool.query(
      "select * from users where user_email = $1 and user_role = $2",
      [email, role]
    );

    if (user.rowCount !== 0) {
      return res.status(401).send("User Already exists");
    }

    //3. Bcrypt the user pasword
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //4. Enter the new user into the DB
    await pool.query(
      "Insert into users(username , user_email,user_password , user_role) values($1,$2,$3,$4)",
      [name, email, bcryptPassword, role]
    );

    //res.json(newUser.rows[0]);
    //5. Generating our jwt token
    const userdata = await pool.query(
      "select * from users where user_email = $1 and user_role = $2",
      [email, role]
    );

    const token = jwtGenerator(
      userdata.rows[0].userid,
      userdata.rows[0].user_role
    );
    res.json({
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  try {
    //1. Destructure Req.body
    const { email, password, role } = req.body;

    //2. Check if user Doesn't exist (if not then we throw error)
    const user = await pool.query(
      "Select * from users where user_email = $1 and user_role = $2",
      [email, role]
    );

    if (user.rows.length === 0) {
      return res.status(401).send("Email / Password is incorrect");
    }

    //3. Check if incoming password is the same as in DB
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).send("Email or Passwd incorrect");
    }

    //4. Give them JWT token
    const token = jwtGenerator(user.rows[0].userid, user.rows[0].user_role);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).status("Server Error");
  }
};

exports.verify = async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
