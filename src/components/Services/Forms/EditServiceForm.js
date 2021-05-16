import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import styles from "../../../css/Services/EditService.module.css";
import AvailabilityTable from "../../Dashboard/Companies/AvailabityTable";
import { validationServiceFormSchema as validationSchema } from "../../../services/ValidateAddCompanyForm.service";
import ButtonGroup from "@ramonak/react-button-group";
const EditServiceForm = ({ service }) => {
  const dispatch = useDispatch();

  //FORMIK SETUP
  debugger;
  const formik = useFormik({
    initialValues: {
      serviceName: service.data.serviceName,
      description: service.data.description,
      duration: service.data.duration,
      price: service.data.price,
      capacity: service.data.capacity,
    },
    validationSchema,
    onSubmit: (values, errors, touched) => {
      console.log(values);
      console.log(touched);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {" "}
        <div className={styles.formInput}>
          <p>Service name</p>
          <input
            name="serviceName"
            id="serviceName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.serviceName}
          ></input>
          {formik.touched.serviceName && formik.errors.serviceName ? (
            <div className={styles.error}>
              {" "}
              <p>{formik.errors.serviceName} </p>
            </div>
          ) : null}
        </div>
        <div className={styles.formInput}>
          <p>Description</p>
          <input
            name="description"
            id="description"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          ></input>
          {formik.touched.description && formik.errors.description ? (
            <div className={styles.error}>
              <p> {formik.errors.description}</p>
            </div>
          ) : null}
        </div>
        <div className={styles.formInput}>
          <p>Availability</p>
          {/* Here Should be updated AvailabilityTable */}
        </div>
        <div className={styles.formInput}>
          <p>Duration</p>
          <ButtonGroup
            containerClassName={styles.container}
            buttonClassName={styles.buttonContainer}
            activeButtonClassName={styles.activeButtonContainer}
            buttons={["30", "60", "90", "120", "150", "180", "210"]}
            onButtonClick={(e) => {
              e.preventDefault();

              formik.setFieldValue("duration", e.target.name);
              formik.setFieldTouched("duration", true);
            }}
          />
          <p>Add duration manually</p>
          <input
            className={styles.manualInput}
            type="text"
            name="duration"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.duration}
          ></input>
          <button type="button" className={styles.addButton}>
            {" "}
            Add duration
          </button>{" "}
          {formik.touched.duration && formik.errors.duration ? (
            <div className={styles.error}>
              <p>{formik.errors.duration} </p>
            </div>
          ) : null}
        </div>
        <div className={styles.formInput}>
          <p>Price(RON)</p>
          <ButtonGroup
            containerClassName={styles.container}
            buttonClassName={styles.buttonContainer}
            activeButtonClassName={styles.activeButtonContainer}
            buttons={["10", "20", "30", "40", "50", "60", "70"]}
            onButtonClick={(e) => {
              e.preventDefault();
              formik.setFieldValue("price", e.target.name);
              formik.setFieldTouched("price", true);
            }}
          />
          <p>Add price manually</p>
          <input
            className={styles.manualInput}
            type="text"
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          ></input>
          <button type="button" className={styles.addButton}>
            Add price
          </button>
          {formik.touched.price && formik.errors.price ? (
            <div className={styles.error}>
              {" "}
              <p> {formik.errors.price}</p>
            </div>
          ) : null}
        </div>
        <div className={styles.formInput}>
          <p>Capacity(person)</p>
          <ButtonGroup
            containerClassName={styles.container}
            buttonClassName={styles.buttonContainer}
            activeButtonClassName={styles.activeButtonContainer}
            buttons={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
            onButtonClick={(e) => {
              e.preventDefault();
              formik.setFieldValue("capacity", e.target.name);
              formik.setFieldTouched("capacity", true);
            }}
          />
          {formik.touched.capacity && formik.errors.capacity ? (
            <div className={styles.error}>
              <p> {formik.errors.capacity}</p>
            </div>
          ) : null}
        </div>
        <button type="submit" className={styles.submitForm}>
          Edit Service
        </button>
      </form>
    </div>
  );
};

export default EditServiceForm;
