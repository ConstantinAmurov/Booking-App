import { yupToFormErrors } from "formik";
import * as Yup from "yup";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export const validateCompanyForm = (values) => {
  const errors = {};

  if (!values.companyName) {
    errors.companyName = "Required";
  } else if (values.companyName.length < 2) {
    errors.companyName = "Must be 2 characters or more";
  }

  if (!values.description) {
    errors.description = "Required";
  } else if (values.description.length < 5) {
    errors.description = "Must be 5 characters or more";
  }
  return errors;
};

// export const validateServiceForm = (values) => {
//   const errors = {};

//   if (!values.serviceName) {
//     errors.serviceName = "Required";
//   } else if (values.serviceName.length < 5) {
//     errors.serviceName = "Must be 5 characters or more";
//   }

//   if (!values.description) {
//     errors.description = "Required";
//   } else if (values.description.length < 5) {
//     errors.description = "Must be 5 characters or more";
//   }

//   if (!values.duration) {
//     errors.duration = "Required";
//   }
//   if (!values.price) {
//     errors.price = "Required";
//   }
//   if (!values.capacity) {
//     errors.capacity = "Required";
//   }

//   return errors;
// };

export const validationAddServiceFormSchema = Yup.object().shape({
  services: Yup.array().of(
    Yup.object().shape({
      serviceName: Yup.string()
        .min(3, "Must be 3 characters or more")
        .required("Required"),
      description: Yup.string()
        .min(3, "Must be 3 characters or more")
        .required("Required"),
      duration: Yup.number()
        .required("Required")
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .integer(),
      price: Yup.number()
        .required("Required")
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .integer(),
      capacity: Yup.number()
        .required("Required")
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .integer(),
    })
  ),
});

export const validationServiceFormSchema = Yup.object({
  serviceName: Yup.string()
    .min(3, "Must be 3 characters or more")
    .required("Required"),
  description: Yup.string()
    .min(3, "Must be 3 characters or more")
    .required("Required"),
  duration: Yup.number()
    .required("Required")
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .integer(),
  price: Yup.number()
    .required("Required")
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .integer(),
  capacity: Yup.number()
    .required("Required")
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .integer(),
});

export const validationUserInformationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Must be 2 characters or more")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Must be 2 characters or more")
    .required("Required"),
  phone: Yup.string()
    .min(8, "Must be 8 numbers or more")
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
});

// // initialValues: {
//       serviceName: "",
//       description: "",
//       duration: "",
//       price: "",
//       capacity: "",
//     },
