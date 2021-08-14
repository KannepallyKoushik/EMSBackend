# Elective Management System

The EMS portal is a usefriendly tool to manage Student's elective course submission for each semester. The portal has a single Super Admin and a user which is ofcourse the Student.

## Overview

The Admin is provided with the following functionalities :

- Publishing Notifications.
  -Publishing new notifications, that will be visilbe to Student.

- Update Batches
  -Add new Batches to the portal.

- Update Courses
  -Add new Courses to the portal.

- Update Faculties
  -Add new Faculties to the portal.

- Update Departments
  -Add new Depatments to the portal.

- View Student Preferences
  -Once the Student submit his/her elective preferences, it is made visible to Admin.

The User or Student is provided with the following features :

- Course List
  -Various courses offered in a particular semester is displayed along with the teaching faculty.

- Notifications
  -Various notifications published by the Admin is visible here, like Deadline for Elective submission.

## Pre-requisites

- Node.js, PostgreSQL.

Inside EMSbackend:

Step1 : Create a database in PostgresSQL.

Step2 : Open .env file.

Step3 : Change the following variables.

- jwtSecret = "Give your Secret Key here"

- PORT = 8000

- DB = "Give your DB name here"

- DB_PASSWORD = "Enter your DB Pasword here"

- NODE_MAILER_SERVICE = "Give your Mail server Ex:-(gmail)"

- ADMIN_EMAIL = "Enter your Mail id"

- ADMIN_EMAIL_PASSWORD = "Enter Password"

- Client_Address = " http://localhost:3000"

- Admin_Client_Address = "http://localhost:3003"

To install all the dependencies, you can run this command inside the project directory:

### `npm install`

Setting up the project

### `npm run dev`

Runs the app in the development mode.

### `npm start`

Runs the app in the production mode.

## Install the following projects

- [emsfrontend] (https://github.com/KannepallyKoushik/emsfrontend.git)
- [ems-admin] (https://github.com/KannepallyKoushik/ems-admin.git)
