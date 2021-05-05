import React from "react";
import styles from "../../../../css/Dashboard/Dashboard.module.css";
const Profile = () => {
  return (
    <div>
      <form className={styles.addCompanyForm}>
        <div>
          <p>Company logo</p>
          <button className={styles.addLogo}>+</button>
        </div>
        <div>
          <p>Company name</p>
          <input type="text" placeHolder="Company name" name="name"></input>
        </div>
        <div>
          <p>Description</p>
          <input
            type="text"
            placeHolder="Company description"
            name="description"
          ></input>
        </div>
        <button className={styles.submitForm}>Save button</button>
      </form>
    </div>
  );
};

export default Profile;
