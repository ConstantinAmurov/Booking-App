import React, { useEffect } from "react";
import styles from "../../../css/Dashboard/Dashboard.module.css";
import { useSelector } from "react-redux";
const WeeklyTable = () => {
  const days = useSelector((state) => state.day.days);
  return (
    <div className={styles.weeklyTable}>
      {days.map((day) => (
        <div className={styles.day}>
          <p>{day.day}</p>
          {day.working ? (
            <p className={styles.hour}>
              {day.openTime}- {day.closeTime}
            </p>
          ) : (
            <p className={styles.hour}>CLOSED</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default WeeklyTable;
