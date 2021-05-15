import React from "react";
import styles from "../../../css/Dashboard/Dashboard.module.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import DeleteButton from "../Modals/DeleteModal";
import EditButton from "../Modals/EditModal";
import ViewCompany from "../Modals/ViewCompanyModal";
const Company = (props) => {
  return (
    <div className={styles.companies}>
      {props.companies.length &&
        props.companies.map((company, index) => (
          <div key={index} className={styles.company}>
            <div className={styles.details}>
              <div>
                <img src={company.imgURL} alt="" />
              </div>
              <div className={styles.info}>
                <h1>{company.name}</h1>
                {company.status === true ? (
                  <p>
                    Status: <span className={styles.active}>Active</span>
                  </p>
                ) : (
                  <p>
                    Status:{" "}
                    <span className={styles.notActive}> Not Active</span>
                  </p>
                )}
                <p>{company.description}</p>
              </div>
            </div>
            <div className={styles.buttons}>
              <EditButton company={company}></EditButton>
              <DeleteButton company={company}></DeleteButton>
              <ViewCompany company={company}></ViewCompany>
              {/* <button className={styles.viewButton}> View company</button> */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Company;
