# Project Support

### Introduction

This is a simple node js project that enables user to create new employees, view all employees, view a single employee,
update an employee and delete an employee.
Very basic authorization has been implemented on each API to check if the user has passed through the required token

### Project Support Features

- Employee management
- Field validation
- Random User ID generator
- Token validator
- Connect to local db instance
- Connect to development db on atlas

### Installation Guide

- Clone this repository [here](https://github.com/jaco5890/senior-back-end.git).
- The develop branch is the most stable branch at any given time, ensure you're working from it.
- Run npm install to install all dependencies
- You can either work with the default database on atlas or use your locally installed MongoDB. Do configure to your choice in the server.js entry file.
- Create an .env file in your project root folder and add your variables. See .env for assistance.

### Usage

- Run npm devStart to start the application.
- Connect to the API using Postman on port 3000.

### API Endpoints

| HTTP Verbs | Endpoints            | Action                                 |
| ---------- | -------------------- | -------------------------------------- |
| GET        | /employees           | To retrieve all employees              |
| GET        | /employees/:id       | To retrieve a single employee          |
| POST       | /employees           | To create a new employee               |
| PATCH      | /employees/:id       | To update an employee                  |
| DELETE     | /employees/:id       | To delete a single employee               |

### Technologies Used

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
- [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.

### Notes
- To start your mongo instance run brew services start mongodb-community@7.0
- To stop your mongo instance run brew services stop mongodb-community@7.0
- To change to database instance on atlas, replace line 41 in server.js with
- require("./config/db");
