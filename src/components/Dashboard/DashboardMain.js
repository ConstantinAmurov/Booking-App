import React from "react";
import styles from "../../css/Dashboard/Dashboard.module.css";
import AddCompany from "./AddCompany";
import Companies from "./Companies/Companies";

const Main = () => {
  return (
    <div className={styles.main}>
      <h1>Overview</h1>

      <AddCompany></AddCompany>
      <Companies></Companies>
    </div>
  );
};

export default Main;
