import React, { useState } from "react";
import styles from "../../css/Dashboard/Dashboard.module.css";

import AddCompanyModalWindow from "./Companies/AddCompanyModalWindow";
const AddCompany = () => {
  return (
    <>
      {" "}
      <div className={styles.addCompany}>
        <div>
          <p className={styles.header}>Add Company</p>
          <p className={styles.text}>Click button to add new company</p>
        </div>
        <AddCompanyModalWindow></AddCompanyModalWindow>`{" "}
      </div>
    </>
  );
};

export default AddCompany;
