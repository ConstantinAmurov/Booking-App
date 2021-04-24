import React, { useState } from "react";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};
export function validateLogin(errors, formData) {
  if (validateEmail(formData.email)) {
    errors.emailError = "";
  } else errors.emailError = "Email is not Valid!";

  formData.password.length < 6
    ? (errors.passwordError = "Password must be at least 6 characters long!")
    : (errors.passwordError = "");
}

export function validateRegister(errors, formData) {
  if (validateEmail(formData.email)) {
    errors.emailError = "";
  } else errors.emailError = "Email is not Valid!";

  formData.password.length < 6
    ? (errors.passwordError = "Password must be at least 6 characters long!")
    : (errors.passwordError = "");

  if (formData.firstName === "") {
    errors.firstNameError = "First name should not be empty";
  } else errors.firstNameError = "";
  if (formData.lastName === "") {
    errors.lastNameError = "Last name should not be empty";
  } else errors.lastNameError = "";
}
export function validateReset(email) {
  if (validateEmail(email)) {
    return "";
  } else return "Email is not Valid!";
}
