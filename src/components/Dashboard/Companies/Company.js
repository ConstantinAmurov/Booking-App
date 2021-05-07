import React from "react";
import styles from "../../../css/Dashboard/Dashboard.module.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
const Company = (props) => {
  return (
    <div className={styles.companies}>
      {props.companies.length &&
        props.companies.map((company, index) => (
          <div key={index} className={styles.company}>
            <img src={company.imgURL} alt="" />
            <div className={styles.info}>
              <h1>{company.name}</h1>
              {company.status === true ? (
                <p>
                  Status: <span className={styles.active}>Active</span>
                </p>
              ) : (
                <p>
                  Status: <span className={styles.notActive}> Not Active</span>
                </p>
              )}
              <p>{company.description}</p>
            </div>
            <div className={styles.buttons}>
              <button className={styles.editButton}>
                {" "}
                <FiEdit2 /> Edit
              </button>
              <button className={styles.deleteButton}>
                {" "}
                <FiTrash2 /> Delete
              </button>
              <button className={styles.viewButton}> View company</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Company;
