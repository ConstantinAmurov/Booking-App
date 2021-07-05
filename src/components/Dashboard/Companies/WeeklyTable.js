import React, { useEffect } from "react";
import styles from "../../../css/Dashboard/Dashboard.module.css";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import { toDate } from "../../../services/Booking.service";
const WeeklyTable = ({ index, service, mode }) => {
  var days = useSelector((state) => state.day[index]);
  if (mode === "edit-service") {
    days = days.map((day) => {
      return {
        ...day,
        openTime: toDate(day.openTime),
        closeTime: toDate(day.closeTime),
      };
    });
  }

  return (
    <div className={styles.weeklyTable}>
      {days.map((day) => (
        <div className={styles.day}>
          <p>{day.day}</p>
          {day.working ? (
            <p className={styles.hour}>
              {format(day.openTime, "kk:mm")} {" - "}
              {format(day.closeTime, "kk:mm")}
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
