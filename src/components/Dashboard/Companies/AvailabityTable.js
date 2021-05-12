import React, { useState } from "react";
import styles from "../../../css/Dashboard/Dashboard.module.css";
import EditTimeModal from "./EditTimeModal";
import WeeklyTable from "./WeeklyTable";

const AvailabityTable = ({ index }) => {
  return (
    <div>
      <p>Availability</p>
      <div className={styles.table}>
        <EditTimeModal index={index}></EditTimeModal>
        <WeeklyTable index={index}></WeeklyTable>
      </div>
    </div>
  );
};

export default AvailabityTable;
