import React from "react";
import styles from "../../css/Services/Service.module.css";
import Services from "./Services";
const ServiceMain = () => {
  return (
    <div className={styles.main}>
      <h1>Service</h1>
      <Services></Services>
    </div>
  );
};

export default ServiceMain;
