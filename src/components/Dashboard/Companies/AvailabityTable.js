import React, { useState } from "react";
import styles from "../../../css/Dashboard/Dashboard.module.css";
import EditTimeModal from "./EditTimeModal";
import WeeklyTable from "./WeeklyTable";

const AvailabityTable = ({ index, service, mode }) => {
  return (
    <div>
      <div className={styles.table}>
        <EditTimeModal
          index={index}
          service={service}
          mode={mode}
        ></EditTimeModal>
        <WeeklyTable index={index} service={service} mode={mode}></WeeklyTable>
      </div>
    </div>
  );
};

export default AvailabityTable;
