import React, { useState } from "react";
import styles from "../../../../css/Dashboard/Dashboard.module.css";
import AvailabityTable from "../AvailabityTable";

import ButtonGroup from "@ramonak/react-button-group";
import { useFormik } from "formik";
import { Formik, Form, Field, FieldArray, getIn } from "formik";
import {
  ADDNEWSERVICE,
  ADDSERVICES,
} from "../../../../store/actions/actionTypes";
import { useDispatch } from "react-redux";
import { validationAddServiceFormSchema as validationSchema } from "../../../../services/ValidateAddCompanyForm.service";

import * as yup from "yup";

const Services = () => {
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [customPrice, setCustomPrice] = useState([
    ["10", "20", "30", "40", "50", "60", "70"],
  ]);
  const [customDuration, setCustomDuration] = useState([
    ["30", "60", "90", "120", "150", "180", "210"],
  ]);
  const dispatch = useDispatch();

  const addCustomPrice = (index, price) => {
    if (price == "") return;
    var modifiedState = null;
    setCustomPrice((previousValue) => {
      modifiedState = previousValue.filter((val, i) => {
        if (i === index) {
          val.push(price);

          return [...val];
        } else return val;
      });
      return modifiedState;
    });
    setPrice("");
  };

  const addCustomDuration = (index, duration) => {
    if (duration == "") return;
    var modifiedState = null;
    setCustomDuration((previousValue) => {
      modifiedState = previousValue.filter((val, i) => {
        if (i === index) {
          val.push(duration);

          return [...val];
        } else return val;
      });

      return modifiedState;
    });
    setDuration("");
  };

  return (
    <Formik
      initialValues={{
        services: [
          {
            serviceName: "",
            description: "",
            duration: "",
            price: "",
            capacity: "",
          },
        ],
      }}
      onSubmit={(values) => {
        const newServices = values.services;
        debugger;
        console.log(newServices);
        dispatch({ type: ADDSERVICES, payload: newServices });
      }}
      validationSchema={validationSchema}
    >
      {({ values, errors, validateForm, handleChange, handleBlur }) => (
        <Form>
          <FieldArray name="services">
            {({ push, replace }) => (
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
                  //duration name
                  const durationName = `services[${index}].duration`;
                  const durationErrorMessage = getIn(errors, duration);
                  //price name
                  const priceName = `services[${index}].price`;
                  const priceErrorMessage = getIn(errors, price);
                  //capacity name
                  const capacityName = `services[${index}].capacity`;
                  const capacityErrorMessage = getIn(errors, capacity);
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
                      <div className={styles.formInput}>
                        <AvailabityTable index={index}></AvailabityTable>
                      </div>
                      <div className={styles.formInput}>
                        <p>Duration</p>
                        <ButtonGroup
                          containerClassName={styles.container}
                          buttonClassName={styles.buttonContainer}
                          activeButtonClassName={styles.activeButtonContainer}
                          buttons={customDuration[index]}
                          onButtonClick={(e) => {
                            e.preventDefault();
                            replace(index, {
                              ...service,
                              duration: e.target.name,
                            });
                          }}
                        />{" "}
                        {/* <div style={{ color: "red" }}>
                          {durationErrorMessage}
                        </div> */}
                        <p>Add duration manually</p>
                        <input
                          className={styles.manualInput}
                          type="text"
                          name="durationName"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                        ></input>
                        <button
                          type="button"
                          className={styles.addButton}
                          onClick={() => {
                            addCustomDuration(index, duration);
                          }}
                        >
                          {" "}
                          Add duration
                        </button>
                      </div>
                      <div className={styles.formInput}>
                        <p>Price(RON)</p>
                        <div>
                          <ButtonGroup
                            containerClassName={styles.container}
                            buttonClassName={styles.buttonContainer}
                            activeButtonClassName={styles.activeButtonContainer}
                            buttons={customPrice[index]}
                            onButtonClick={(e) => {
                              e.preventDefault();

                              replace(index, {
                                ...service,
                                price: e.target.name,
                              });
                            }}
                          />
                        </div>
                        <p>Add duration manually</p>
                        {/* <Field
                          className={styles.manualInput}
                          type="text"
                          name={priceName}
                          value={price}
                        ></Field> */}
                        <input
                          className={styles.manualInput}
                          type="text"
                          name="priceName"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        ></input>
                        <button
                          type="button"
                          onClick={() => {
                            addCustomPrice(index, price);
                          }}
                          className={styles.addButton}
                        >
                          {" "}
                          Add price
                        </button>
                      </div>
                      <div className={styles.formInput}>
                        <p>Capacity(person)</p>

                        <ButtonGroup
                          containerClassName={styles.container}
                          buttonClassName={styles.buttonContainer}
                          activeButtonClassName={styles.activeButtonContainer}
                          buttons={[
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                          ]}
                          onButtonClick={(e) => {
                            e.preventDefault();
                            replace(index, {
                              ...service,
                              capacity: e.target.name,
                            });
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
                <button
                  type="button"
                  className={styles.addServiceButton}
                  onClick={() => {
                    setCustomDuration((previousDuration) => [
                      ...previousDuration,
                      ["30", "60", "90", "120", "150", "180", "210"],
                    ]);
                    setCustomPrice((previousDuration) => [
                      ...previousDuration,
                      ["10", "20", "30", "40", "50", "60", "70"],
                    ]);
                    push({ serviceName: "", description: "" });
                    dispatch({ type: ADDNEWSERVICE });
                  }}
                >
                  Add Service
                </button>
              </>
            )}
          </FieldArray>

          <button type="submit" className={styles.submitForm}>
            Save services
          </button>
          {/* <pre>{JSON.stringify(values, null, 2)}</pre>

          <pre>{JSON.stringify(errors, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default Services;
