const bcrypt = require("bcrypt");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  post: 5432,
  database: "ems",
});

async function test(name, email, password) {
  try {
    await pool.query("Drop table if exists admin");
    await pool.query("Drop table if exists approvedcourse");
    await pool.query("Drop table if exists feedback");
    await pool.query("Drop table if exists event");
    await pool.query("Drop table if exists course");
    await pool.query("Drop table if exists faculty");
    await pool.query("Drop table if exists users");
    await pool.query("Drop table if exists department");
    await pool.query("Drop table if exists batch");

    await pool.query(
      "create Table users(userid uuid Primary Key Default uuid_generate_v4(),username varchar(255) Not Null,user_email varchar(255) Not Null,user_password varchar(255) Not Null,user_role varchar(100) Not Null,verified varchar(100) Not Null Default 'no')"
    );

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    await pool.query(
      "Insert into users(username , user_email,user_password , user_role,verified) values($1,$2,$3,$4,$5)",
      [name, email, bcryptPassword, "admin", "yes"]
    );
  } catch (error) {
    console.error(error.message);
  }
}

test("Koushik", "cb.en.p2cse20017@cb.students.amrita.edu", "abcd@1234");
