import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import styles from "../../../css/Dashboard/Dashboard.module.css";
import {
  filterOpenTime,
  filterCloseTime,
  setWorking,
} from "../../../contexts/TimeContext";
import { DragSwitch } from "react-dragswitch";
import "react-dragswitch/dist/index.css";

import { ADDTIME } from "../../../store/actions/actionTypes";
import { useSelector } from "react-redux";

const DaySelector = ({ day }) => {
  const days = useSelector((state) => state.day.days);
  debugger;
  const specificDay = days.filter((weekDay) => weekDay.day === day);

  const [isWorking, setIsWorking] = useState(specificDay[0].working);

  const openTimeRef = useRef();
  const closeTimeRef = useRef();

  const dispatch = useDispatch();

  function handleSwitchChange(isWorking) {
    openTimeRef.current.disabled = !isWorking;
    closeTimeRef.current.disabled = !isWorking;
    var filteredState = null;
    setIsWorking(isWorking);
    filteredState = setWorking(days, day, isWorking);
    dispatch({
      type: ADDTIME,
      filteredState: filteredState,
    });
  }

  function handleTimeChange(e, setTime) {
    const { name, value } = e.target;
    var filteredState = null;

    if (name === "openTime") {
      filteredState = filterOpenTime(days, day, value);
    } else {
      filteredState = filterCloseTime(days, day, value);
    }
    dispatch({
      type: ADDTIME,
      payload: filteredState,
    });
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
            onChange={(e) => handleSwitchChange(e)}
          />
        </div>
        <div className={styles.openHours}>
          <p>OPEN</p>{" "}
          <input
            ref={openTimeRef}
            value={specificDay[0].openTime}
            name="openTime"
            onChange={(e) => handleTimeChange(e)}
            type="time"
          ></input>
        </div>
        <div className={styles.closeHours}>
          <p>CLOSE</p>{" "}
          <input
            ref={closeTimeRef}
            value={specificDay[0].closeTime}
            name="closeTime"
            onChange={(e) => handleTimeChange(e)}
            type="time"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default DaySelector;
