import React, { useState } from "react";
import styles from "../../css/Dashboard/Dashboard.module.css";
import { getCompanies } from "../../contexts/DatabaseContext";
const AddCompany = () => {
  const [companies, setCompanies] = useState({
    name: "",
    Description: "",
    Status: "",
  });

  console.log(companies);
  return (
    <>
      <div className={styles.addCompany}>
        <div>
          <p className={styles.header}>Add Company</p>
          <p className={styles.text}>Click button to add new company</p>
        </div>
        <button>+</button>`{" "}
      </div>
    </>
  );
};

export default AddCompany;
