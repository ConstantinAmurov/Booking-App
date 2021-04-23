import React, { useState } from "react";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};
export function validateLogin(errors, formData) {
  debugger;
  if ((formData.email = validEmailRegex.test(formData.email))) {
    errors.emailError = "";
  } else errors.emailError = "Email is not Valid!";

  formData.password.length < 6
    ? (errors.passwordError = "Password must be at least 6 characters long!")
    : (errors.passwordError = "");
}

export function validateRegister(errors, formData) {
  if ((formData.email = validEmailRegex.test(formData.email))) {
    errors.emailError = "";
  } else errors.emailError = "Email is not Valid!";

  formData.password.length < 6
    ? (errors.passwordError = "Password must be at least 6 characters long!")
    : (errors.passwordError = "");

  if (formData.firstName == "") {
    debugger;
    errors.firstNameError = "First name should not be empty";
  }
  if (formData.lastName.length == "") {
    errors.lastNameError = "Last name should not be empty";
  }
}
export function validateReset(email) {
  if ((email = validEmailRegex.test(email))) {
    return "";
  } else return "Email is not Valid!";
}
