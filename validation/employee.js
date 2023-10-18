const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEmployee(data) {
  let errors = [];
  //basic information
  data.basicInformation.firstName = !isEmpty(data.basicInformation.firstName)
    ? data.basicInformation.firstName
    : '';
  data.basicInformation.lastName = !isEmpty(data.basicInformation.lastName)
    ? data.basicInformation.lastName
    : '';
  data.basicInformation.contactNumber = !isEmpty(
    data.basicInformation.contactNumber
  )
    ? data.basicInformation.contactNumber
    : '';
  data.basicInformation.email = !isEmpty(data.basicInformation.email)
    ? data.basicInformation.email
    : '';
  data.basicInformation.birthday = !isEmpty(data.basicInformation.birthday)
    ? data.basicInformation.birthday
    : '';
  //address information
  data.addressInformation.streetAddress = !isEmpty(
    data.addressInformation.streetAddress
  )
    ? data.addressInformation.streetAddress
    : '';
  data.addressInformation.city = !isEmpty(data.addressInformation.city)
    ? data.addressInformation.city
    : '';
  data.addressInformation.postalCode = !isEmpty(
    data.addressInformation.postalCode
  )
    ? data.addressInformation.postalCode
    : '';
  data.addressInformation.country = !isEmpty(data.addressInformation.country)
    ? data.addressInformation.country
    : '';

  //skills information
  data.skills = data.skills?.length > 0 ? data.skills : [];

  //basic information validation
  
  if (isEmpty(data.basicInformation.firstName)) {
    errors.push({ name: "First name is required" });
  }

  if (isEmpty(data.basicInformation.lastName)) {
    errors.push({ lastName: "Last name is required" });
  }

  if (isEmpty(data.basicInformation.email)) {
    errors.push({ email: "Email name is required" });
  }

  if (!Validator.isEmail(data.basicInformation.email)) {
    errors.push({ email: "Email is invalid" });
  }

  if (isEmpty(data.basicInformation.contactNumber)) {
    errors.push({ contactNumber: "Contact number is required" });
  }

  if (isEmpty(data.basicInformation.birthday)) {
    errors.push({ birthday: "Birthday is required" });
  }

  //address information validation

  if (isEmpty(data.addressInformation.streetAddress)) {
    errors.push({ streetAddress: "Street address is required" });
  }

  if (isEmpty(data.addressInformation.city)) {
    errors.push({ city: "City is required" });
  }

  if (isEmpty(data.addressInformation.postalCode)) {
    errors.push({ postalCode: "Postal code is required" });
  }

  if (isEmpty(data.addressInformation.country)) {
    errors.push({ country: "country is required" });
  }

  //skills information validation

  if (isEmpty(data?.skills[0]?.skill)) {
    errors.push({ skill: "One skill is required" });
  }

  if (isEmpty(data.skills[0]?.yearsExperience)) {
    errors.push({ yearsExperience: "Years of experience is required" });
  }

  if (isEmpty(data.skills[0]?.seniority)) {
    errors.push({ seniority: "Seniority is required" });
  }
  return {
    errors,
    isValid: errors?.length === 0,
  };
};
