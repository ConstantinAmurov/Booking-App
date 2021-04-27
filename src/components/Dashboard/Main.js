import React from "react";
import styles from "../../css/Dashboard/Dashboard.module.css";
import AddCompany from "./AddCompany";
const Main = () => {
  return (
    <div className={styles.main}>
      <h1>Overview</h1>
      <AddCompany></AddCompany>
    </div>
  );
};

export default Main;
