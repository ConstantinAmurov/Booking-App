import React from "react";
import { useFormik } from "formik";
import styles from "../../../css/Services/EditService.module.css";
import { validationUserInformationSchema as validationSchema } from "../../../services/ValidateAddCompanyForm.service";
import { addReservation } from "../../../contexts/DatabaseContext";
const UserInformationForm = ({
  handleSectionChange,
  handleUserChange,
  reservationInfo,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);

      var reservationId = await addReservation({ ...reservationInfo, values });
      if (reservationId) {
        handleSectionChange("confirmation", {
          ...values,
          startTime: reservationInfo.startTime,
          reservationId: reservationId,
        });
      }
    },
  });

  return (
    <>
      <form className={styles.userInfo} onSubmit={formik.handleSubmit}>
        <div className={styles.formInput}>
          <p>First name</p>
          <input
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Enter your first name"
          ></input>
          {formik.touched.firstName && formik.errors.firstName ? (
            <span className={styles.error}>{formik.errors.firstName}</span>
          ) : null}
        </div>
        <div className={styles.formInput}>
          <p>Last name</p>
          <input
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Enter your last name"
          ></input>
          {formik.touched.lastName && formik.errors.lastName ? (
            <span className={styles.error}>{formik.errors.lastName}</span>
          ) : null}
        </div>
        <div className={styles.formInput}>
          <p>Phone</p>
          <input
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Enter your phone"
          ></input>
          {formik.touched.phone && formik.errors.phone ? (
            <span className={styles.error}>{formik.errors.phone}</span>
          ) : null}
        </div>
        <div className={styles.formInput}>
          <p>Email</p>
          <input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            placeholder="Enter your email"
          ></input>
          {formik.touched.email && formik.errors.email ? (
            <span className={styles.error}>{formik.errors.email}</span>
          ) : null}
        </div>
        <button className={styles.submitForm} type="submit">
          Submit Information
        </button>
        <button
          className={styles.backButton}
          onClick={() => handleSectionChange("book-service")}
        >
          {" "}
          Back to booking
        </button>
      </form>
    </>
  );
};

export default UserInformationForm;
