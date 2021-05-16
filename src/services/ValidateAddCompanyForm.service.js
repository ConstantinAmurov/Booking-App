import * as Yup from "yup";

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

// // initialValues: {
//       serviceName: "",
//       description: "",
//       duration: "",
//       price: "",
//       capacity: "",
//     },
