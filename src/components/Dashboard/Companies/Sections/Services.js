import React, { useState } from "react";
import styles from "../../../../css/Dashboard/Dashboard.module.css";
import AvailabityTable from "../AvailabityTable";
import Selector from "../Selector";
import ButtonGroup from "@ramonak/react-button-group";

const Services = () => {
  const [serviceName, setServiceName] = useState();
  const [description, setDescription] = useState();
  const [availability, setAvailability] = useState();
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();
  const [capacity, setCapacity] = useState();

  const handleSubmit = (e) => {
    console.log(serviceName, description, duration, price, capacity);
    e.preventDefault();
  };

  const handleButtonSelection = (e) => {
    e.preventDefault();
    console.log(e.target.name);
  };
  return (
    <div className={styles.addServicesForm}>
      <div>
        <p>Services name</p>
        <input
          onChange={(e) => setServiceName(e.target.value)}
          type="text"
          name="name"
        ></input>
      </div>
      <div>
        <p>Description</p>
        <input
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          name="description"
        ></input>
      </div>
      <AvailabityTable></AvailabityTable>
      <div>
        <p>Duration(min)</p>

        <ButtonGroup
          containerClassName={styles.container}
          buttonClassName={styles.buttonContainer}
          activeButtonClassName={styles.activeButtonContainer}
          buttons={["30", "60", "90", "120", "150", "180", "210"]}
          onButtonClick={(e) => {
            setDuration(e.target.name);
          }}
        />
      </div>
      <div>
        <p>Add duration manually</p>
        <input
          className={styles.manualInput}
          type="text"
          name="duration"
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button className={styles.addButton}> Add duration</button>
      </div>
      <div>
        <p>Price(RON)</p>

        <ButtonGroup
          containerClassName={styles.container}
          buttonClassName={styles.buttonContainer}
          activeButtonClassName={styles.activeButtonContainer}
          buttons={["10", "20", "30", "40", "50", "60", "70"]}
          onButtonClick={(e) => {
            setPrice(e.target.name);
          }}
        />
      </div>
      <div>
        <p>Add price manually</p>
        <input
          className={styles.manualInput}
          type="text"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <button className={styles.addButton}> Add price</button>
      </div>
      <div>
        <p>Capacity(person)</p>

        <ButtonGroup
          containerClassName={styles.container}
          buttonClassName={styles.buttonContainer}
          activeButtonClassName={styles.activeButtonContainer}
          buttons={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          onButtonClick={(e) => {
            setCapacity(e.target.name);
          }}
        />
      </div>
      <button onClick={(e) => handleSubmit(e)} className={styles.submitForm}>
        Save services
      </button>
      <button className={styles.addServiceButton}>Add other service</button>
    </div>
  );
};

export default Services;
