import React from "react";
import styles from "../../../css/Dashboard/Dashboard.module.css";
import EditTimeModal from "./EditTimeModal";
const AvailabityTable = () => {
  return (
    <div>
      <p>Availability</p>
      <div className={styles.table}>
        <EditTimeModal></EditTimeModal>

        <div className={styles.weeklyTable}>
          <div className={styles.day}>
            <p>SUNDAY</p> <p className={styles.hour}>08:00-18:00</p>
          </div>
          <div className={styles.day}>
            <p>MONDAY</p> <p className={styles.hour}>08:00-18:00</p>
          </div>
          <div className={styles.day}>
            <p>TUESDAY</p> <p className={styles.hour}>08:00-18:00</p>
          </div>
          <div className={styles.day}>
            <p>WEDNESDAY</p> <p className={styles.hour}>08:00-18:00</p>
          </div>
          <div className={styles.day}>
            <p>THURSDAY</p> <p className={styles.hour}>08:00-18:00</p>
          </div>
          <div className={styles.day}>
            <p>FRIDAY</p> <p className={styles.hour}>08:00-18:00</p>
          </div>
          <div className={styles.day}>
            <p className={styles.dayOfWeek}>SATURDAY</p>{" "}
            <p className={styles.hour}>08:00-18:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabityTable;
