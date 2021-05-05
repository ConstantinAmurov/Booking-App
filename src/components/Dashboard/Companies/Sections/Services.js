import React from "react";
import styles from "../../../../css/Dashboard/Dashboard.module.css";
import AvailabityTable from "../AvailabityTable";
import Selector from "../Selector";

const Services = () => {
  return (
    <div>
      <form className={styles.addServicesForm}>
        <div>
          <p>Services name</p>
          <input type="text" name="name"></input>
        </div>
        <div>
          <p>Description</p>
          <input type="text" name="description"></input>
        </div>
        <AvailabityTable></AvailabityTable>
        <div>
          <p>Duration(min)</p>
          <div className={styles.durations}>
            <Selector input="30" />
            <Selector input="60" />
            <Selector input="90" />
            <Selector input="120" />
            <Selector input="150" />
            <Selector input="180" />
            <Selector input="210" />
          </div>
        </div>
        <div>
          <p>Add duration manually</p>
          <input
            className={styles.manualInput}
            type="text"
            name="duration"
          ></input>
          <button className={styles.addButton}> Add duration</button>
        </div>
        <div>
          <p>Price(RON)</p>
          <div className={styles.prices}>
            <Selector input="10" />
            <Selector input="20" />
            <Selector input="30" />
            <Selector input="40" />
            <Selector input="50" />
            <Selector input="60" />
            <Selector input="70" />
          </div>
        </div>
        <div>
          <p>Add price manually</p>
          <input
            className={styles.manualInput}
            type="text"
            name="price"
          ></input>
          <button className={styles.addButton}> Add price</button>
        </div>
        <div>
          <p>Capacity(person)</p>
          <div className={styles.capacities}>
            <Selector input="1" />
            <Selector input="2" />
            <Selector input="3" />
            <Selector input="4" />
            <Selector input="5" />
            <Selector input="6" />
            <Selector input="7" />
            <Selector input="8" />
            <Selector input="9" />
          </div>
        </div>
        <button className={styles.submitForm}>Save services</button>
        <button className={styles.addServiceButton}>Add other service</button>
      </form>
    </div>
  );
};

export default Services;
