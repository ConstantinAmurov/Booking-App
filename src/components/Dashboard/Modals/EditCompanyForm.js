import React from "react";
import { useFormik } from "formik";
//import styles from "../Companies/css";
import { useDispatch, useSelector } from "react-redux";
import { validateCompanyForm as validate } from "../../../services/ValidateAddCompanyForm.service";

const EditCompanyForm = ({ company }) => {
  console.log(company);
  return <div></div>;
};

export default EditCompanyForm;
