const bcrypt = require("bcrypt");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  post: 5432,
  database: "ems",
});

async function test(email, password) {
  try {
    await pool.query("Drop table if exists admin");
    await pool.query("Drop table if exists approvedcourse");
    await pool.query("Drop table if exists feedback");
    await pool.query("Drop table if exists course");
    await pool.query("Drop table if exists event");
    await pool.query("Drop table if exists faculty");
    await pool.query("Drop table if exists users");
    await pool.query("Drop table if exists department");
    await pool.query("Drop table if exists batch");

    await pool.query(
      "CREATE TABLE admin(ad_id uuid Primary Key Default uuid_generate_v4(), ad_email VARCHAR ( 100 ) UNIQUE NOT NULL,password VARCHAR ( 255 ) NOT NULL)"
    );

    await pool.query(
      "CREATE TABLE department(dep_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,dep_name VARCHAR(100) UNIQUE  NOT NULL)"
    );

    await pool.query(
      "CREATE TABLE batch(batch_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,pass_in VARCHAR(50) UNIQUE NOT NULL,pass_out VARCHAR(50) UNIQUE NOT NULL)"
    );

    await pool.query(
      "CREATE TABLE users(userid uuid Primary Key Default uuid_generate_v4(),username VARCHAR ( 100 ) NOT NULL,user_email VARCHAR ( 100 ) UNIQUE NOT NULL,dep_id INT,CONSTRAINT fk_dep FOREIGN KEY(dep_id) REFERENCES department(dep_id),mobile VARCHAR(15),user_password VARCHAR ( 255 ) NOT NULL,verified VARCHAR ( 10 ) NOT NULL DEFAULT 'no', batch_id INT,CONSTRAINT fk_batch FOREIGN KEY(batch_id) REFERENCES batch(batch_id),timestamp timestamp NOT NULL DEFAULT NOW())"
    );

    await pool.query(
      "CREATE TABLE faculty(fac_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,facname VARCHAR ( 100 ) NOT NULL,dep_id INT,CONSTRAINT fk_dep FOREIGN KEY(dep_id) REFERENCES department(dep_id),fac_email VARCHAR ( 100 ) UNIQUE NOT NULL)"
    );

    await pool.query(
      "CREATE TABLE event(eid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,ev_name VARCHAR ( 250 ) NOT NULL,dep_id INT,CONSTRAINT fk_dep FOREIGN KEY(dep_id) REFERENCES department(dep_id),ev_deadline VARCHAR ( 50 ) NOT NULL,timestamp timestamp NOT NULL DEFAULT NOW(),batch_id INT,CONSTRAINT fk_batch FOREIGN KEY(batch_id) REFERENCES batch(batch_id))"
    );

    await pool.query(
      "CREATE TABLE course(cid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,c_code VARCHAR (50) Not NULL UNIQUE,cname VARCHAR ( 100 ) NOT NULL,dep_id INT,CONSTRAINT fk_dep FOREIGN KEY(dep_id) REFERENCES department(dep_id),fac_id INT,CONSTRAINT fk_fac FOREIGN KEY(fac_id) REFERENCES faculty(fac_id),eid INT,CONSTRAINT fk_event FOREIGN KEY(eid) REFERENCES event(eid),offered BOOLEAN NOT NULL DEFAULT FALSE)"
    );

    await pool.query(
      "CREATE TABLE approvedcourse(ap_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,cid INT,CONSTRAINT fk_course FOREIGN KEY(cid) REFERENCES course(cid),userid uuid,CONSTRAINT fk_users FOREIGN KEY(userid) REFERENCES users(userid),fac_id INT,CONSTRAINT fk_fac FOREIGN KEY(fac_id) REFERENCES faculty(fac_id),dep_id INT,CONSTRAINT fk_dep FOREIGN KEY(dep_id) REFERENCES department(dep_id),batch_id INT, CONSTRAINT fk_batch FOREIGN KEY(batch_id) REFERENCES batch(batch_id))"
    );

    await pool.query(
      "CREATE TABLE feedback(feed_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,feedback text NOT NULL,cid INT,CONSTRAINT fk_course FOREIGN KEY(cid) REFERENCES course(cid),batch_id INT,CONSTRAINT fk_batch FOREIGN KEY(batch_id) REFERENCES batch(batch_id),userid uuid,CONSTRAINT fk_users FOREIGN KEY(userid) REFERENCES users(userid),fac_id INT,CONSTRAINT fk_fac FOREIGN KEY(fac_id) REFERENCES faculty(fac_id))"
    );

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    await pool.query("Insert into admin(ad_email,password) values($1,$2)", [
      email,
      bcryptPassword,
    ]);
  } catch (error) {
    console.error(error.message);
  }
}

test("emsamritacb@gmail.com", "abcd@1234");
