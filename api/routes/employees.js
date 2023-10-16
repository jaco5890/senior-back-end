const express = require("express");

const validateEmployee = require("../../validation/employee");

const Employee = require("../models/Employee");

const { generateID } = require("../../utils/idGenerator");
const { validateToken } = require("../../utils/validateUserToken");

const {
  Success,
  CreateSuccess,
  BadRequest,
  Forbidden, //to be used when authentication is in place
  NotFound,
  InternalServerError,
} = require("../../utils/response");

const router = express.Router();

//get all employees
router.get("/", validateToken, async (request, response) => {
  try {
    const employees = await Employee.find();
    if (employees?.length > 0) {
      Success(response, employees);
    } else {
      NotFound(response, []);
    }
  } catch (err) {
    InternalServerError(response, err);
  }
});

//get employee by id
router.get("/:id", validateToken, getEmployee, async (request, response) => {
  try {
    Success(response, response.employee);
  } catch (err) {
    InternalServerError(response, err);
  }
});

//create employee
router.post("/", validateToken, async (request, response) => {
  const { errors, isValid } = validateEmployee(request.body);

  //validate user fields
  if (!isValid) {
    BadRequest(response, { message: errors, response: "Not valid" });
  } else {
    const employee = new Employee({
      basicInformation: request.body.basicInformation,
      addressInformation: request.body.addressInformation,
      skills: request.body.skills,
      ID: generateID(),
    });

    try {
      const newEmployee = await employee.save();
      newEmployee
        ? CreateSuccess(response, newEmployee)
        : BadRequest(response, []);
    } catch (err) {
      InternalServerError(response, err);
    }
  }
});

//update employee
router.patch("/:id", validateToken, getEmployee, async (request, response) => {
  const { errors, isValid } = validateEmployee(request.body);

  if (!isValid) {
    BadRequest(response, { message: errors, response: "Not valid" });
  } else {
    try {
      response.employee.basicInformation = request?.body?.basicInformation;
      response.employee.addressInformation = request?.body?.addressInformation;
      response.employee.skills = request?.body?.skills;

      const updatedEmployee = await response.employee.save();
      updatedEmployee
        ? Success(response, updatedEmployee)
        : BadRequest(response, []);
    } catch (err) {
      InternalServerError(response, err);
    }
  }
});

//delete employee
router.delete("/:id", validateToken, getEmployee, async (request, response) => {
  try {
    await response.employee.deleteOne();
    Success(response, []);
  } catch (err) {
    console.log(err, "ERROR");
    InternalServerError(response, err);
  }
});

//find employee by id
async function getEmployee(request, response, next) {
  let employee;
  try {
    employee = await Employee.findById(request.params.id);
    if (employee === null) {
      return NotFound(response, []);
    }
  } catch (err) {
    return InternalServerError(response, err);
  }
  response.employee = employee;
  next();
}

module.exports = router;
