Create Database ems;

CREATE EXTENSION "uuid-ossp";
--set extension of uuid before this
create Table users(
    userid uuid Primary Key Default uuid_generate_v4(),
    username varchar(255) Not Null,
    user_email varchar(255) Not Null,
    user_password varchar(255) Not Null,
    user_role varchar(100) Not Null
)

--Inserting Super user
insert into users (username, user_email,user_password,user_role) values ('admin','cb.en.p2cse20017@cb.students.amrita.edu','1234@Abcd','admin')

-- Inserting a fake student user
insert into users (username, user_email,user_password,user_role) values ('deep pancholi','cb.en.p2cse20011@cb.students.amrita.edu','abcd@1234','student')

