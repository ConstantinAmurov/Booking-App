import React, { useState } from "react";
import styles from "../../../../css/Dashboard/Dashboard.module.css";
import AvailabityTable from "../AvailabityTable";
import Selector from "../Selector";
import ButtonGroup from "@ramonak/react-button-group";
import { useFormik } from "formik";
import { Formik, Form, Field, FieldArray, getIn } from "formik";

import * as yup from "yup";

import { validateServiceForm as validate } from "../../../../services/ValidateAddCompanyForm.service";

const Services = (props) => {
  const [serviceName, setServiceName] = useState();
  const [description, setDescription] = useState();
  const [availability, setAvailability] = useState();
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();
  const [capacity, setCapacity] = useState();
  const [servicesNumber, setServicesNumber] = useState(1);

  const handleSubmit = (e) => {
    console.log(serviceName, description, duration, price, capacity);
    e.preventDefault();
  };

  const handleButtonSelection = (e) => {
    e.preventDefault();
    console.log(e.target.name);
  };

  const addNewServiceSection = () => {
    setServicesNumber(servicesNumber + 1);
  };
  //FORMIK INITIALIZATION

  // const formik = useFormik({
  //   initialValues: {
  //     serviceName: "",
  //     description: "",
  //     duration: "",
  //     price: "",
  //     capacity: "",
  //   },
  //   validate,
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });
  const validationSchema = yup.object().shape({
    services: yup.array().of(
      yup.object().shape({
        serviceName: yup.string().min(3),
        description: yup.string().min(3),
      })
    ),
  });

  return (
    <Formik
      initialValues={{ services: [{ serviceName: "", description: "" }] }}
      onSubmit={() => {}}
      validationSchema={validationSchema}
    >
      {({ values, errors }) => (
        <Form>
          <FieldArray name="services">
            {({ push }) => (
              <>
                {values.services.map((service, index) => {
                  //service name
                  const serviceName = `services[${index}].serviceName`;
                  const serviceNameErrorMessage = getIn(errors, serviceName);
                  //description name
                  const descriptionName = `services[${index}].description`;
                  const descriptionErrorMessage = getIn(
                    errors,
                    descriptionName
                  );
                  return (
                    <div key={index}>
                      <div className={styles.formInput}>
                        <p>Service name</p>
                        <Field
                          name={serviceName}
                          value={service.serviceName}
                        ></Field>
                        <div style={{ color: "red" }}>
                          {serviceNameErrorMessage}
                        </div>
                      </div>
                      <div className={styles.formInput}>
                        <p>Description</p>
                        <Field
                          name={descriptionName}
                          value={service.description}
                        ></Field>
                        <div style={{ color: "red" }}>
                          {descriptionErrorMessage}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button
                  type="button"
                  className={styles.addServiceButton}
                  onClick={() => push({ serviceName: "", description: "" })}
                >
                  Add Service
                </button>
              </>
            )}
          </FieldArray>

          <button type="submit" className={styles.submitForm}>
            Save services
          </button>
          <pre>{JSON.stringify(values, null, 2)}</pre>

          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </Form>
      )}
    </Formik>

    // <form className={styles.addServicesForm} onSubmit={formik.handleSubmit}>
    //   <div>
    //     <p>Services name</p>
    //     <input
    //       type="text"
    //       name="serviceName"
    //       value={formik.values.serviceName}
    //       onChange={formik.handleChange}
    //       onBlur={formik.handleBlur}
    //     ></input>
    //     {formik.touched.serviceName && formik.errors.serviceName ? (
    //       <div>{formik.errors.serviceName}</div>
    //     ) : null}
    //   </div>
    //   <div>
    //     <p>Description</p>
    //     <input
    //       onChange={formik.handleChange}
    //       type="text"
    //       name="description"
    //       value={formik.values.description}
    //       onBlur={formik.handleBlur}
    //     ></input>
    //     {formik.touched.description && formik.errors.description ? (
    //       <div>{formik.errors.description}</div>
    //     ) : null}
    //   </div>
    //   <AvailabityTable></AvailabityTable>
    //   <div>
    //     <p>Duration(min)</p>

    //     <ButtonGroup
    //       containerClassName={styles.container}
    //       buttonClassName={styles.buttonContainer}
    //       activeButtonClassName={styles.activeButtonContainer}
    //       buttons={["30", "60", "90", "120", "150", "180", "210"]}
    //       onButtonClick={(e) => {
    //         e.preventDefault();
    //         formik.setFieldValue("duration", e.target.name);
    //         console.log(formik.errors);
    //         debugger;
    //       }}
    //     />
    //     {formik.errors.duration ? <div>{formik.errors.duration}</div> : null}
    //   </div>
    //   <div>
    //     <p>Add duration manually</p>
    //     <input
    //       className={styles.manualInput}
    //       type="text"
    //       name="duration"
    //       value={formik.values.duration}
    //       onChange={formik.handleChange}
    //     ></input>
    //     <button className={styles.addButton}> Add duration</button>
    //   </div>
    //   <div>
    //     <p>Price(RON)</p>

    //     <ButtonGroup
    //       containerClassName={styles.container}
    //       buttonClassName={styles.buttonContainer}
    //       activeButtonClassName={styles.activeButtonContainer}
    //       buttons={["10", "20", "30", "40", "50", "60", "70"]}
    //       onButtonClick={(e) => {
    //         e.preventDefault();
    //         formik.setFieldValue("price", e.target.name);
    //       }}
    //     />
    //     {formik.errors.price ? <div>{formik.errors.price}</div> : null}
    //   </div>
    //   <div>
    //     <p>Add price manually</p>
    //     <input
    //       className={styles.manualInput}
    //       type="text"
    //       name="price"
    //       value={formik.values.price}
    //       onChange={formik.handleChange}
    //     ></input>
    //     <button className={styles.addButton}> Add price</button>
    //   </div>
    //   <div>
    //     <p>Capacity(person)</p>

    //     <ButtonGroup
    //       containerClassName={styles.container}
    //       buttonClassName={styles.buttonContainer}
    //       activeButtonClassName={styles.activeButtonContainer}
    //       buttons={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
    //       onButtonClick={(e) => {
    //         e.preventDefault();
    //         formik.setFieldValue("capacity", e.target.name);
    //         formik.setFieldTouched("capacity", true, true);
    //       }}
    //     />
    //     {formik.errors.capacity ? <div>{formik.errors.capacity}</div> : null}
    //   </div>

    //   <button type="submit" className={styles.submitForm}>
    //     Save services
    //   </button>
    //   <button
    //     onClick={() => addNewServiceSection()}
    //     className={styles.addServiceButton}
    //     type="button"
    //   >
    //     Add other service
    //   </button>
    // </form>
  );
};

export default Services;
