import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../../../css/Dashboard/Dashboard.module.css";
//import Switch from "react-switch"

import { DragSwitch } from "react-dragswitch";
import "react-dragswitch/dist/index.css";

import { ADDOPENTIME } from "../../../store/actions/actionTypes";

const DaySelector = ({ day }) => {
  const [checked, setChecked] = useState(false);
  const [openTime, setOpenTime] = useState("09:00");
  const [closeTime, setCloseTime] = useState("21:00");

  const [isWorking, setIsWorking] = useState(false);

  const dispatch = useDispatch();

  function handleChange(checked) {
    setChecked(checked);
  }

  function handleTimeChange(e, setTime) {
    const { name, value } = e.target;
    debugger;
    setTime(e.target.value);
    debugger;
    dispatch({ type: ADDOPENTIME, day: day, openTime: e.target.value });
  }
  function handleCloseTimeChange(e) {
    setCloseTime(e.target.value);
  }

  return (
    <div className={styles.daySelector}>
      <div className={styles.day}>
        <h4>{day}</h4>
      </div>
      <div className={styles.details}>
        <div className={styles.workingSwitch}>
          <p>WORKING</p>
          <DragSwitch
            checked={isWorking}
            onColor="#F29F57"
            handleColor={isWorking ? "#EF6313" : "#4F4F4F"}
            onChange={(e) => {
              setIsWorking(e);
            }}
          />
        </div>
        <div className={styles.openHours}>
          <p>OPEN</p>{" "}
          <input
            name="openTime"
            onChange={(e) => handleTimeChange(e, setOpenTime)}
            type="time"
          ></input>
        </div>
        <div className={styles.closeHours}>
          <p>CLOSE</p>{" "}
          <input
            name="closeTime"
            onChange={(e) => handleTimeChange(e, setCloseTime)}
            type="time"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default DaySelector;
