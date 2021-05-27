import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import styles from "../../../css/Dashboard/Dashboard.module.css";

import { DragSwitch } from "react-dragswitch";
import "react-dragswitch/dist/index.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../css/DatePicker.css";

import {
  UPDATEWORKINGSTATE,
  UPDATEOPENTIMESTATE,
  UPDATECLOSETIMESTATE,
} from "../../../store/actions/actionTypes";
import { useSelector } from "react-redux";
import { toDate } from "../../../services/Booking.service";

const DaySelector = ({ index, day, service, mode }) => {
  debugger;
  var days = useSelector((state) => state.day[index]);
  if (mode === "edit-service") {
    debugger;
    days = service.data.workingDays.map((workingDay) => {
      return {
        ...workingDay,
        openTime: toDate(workingDay.openTime),
        closeTime: toDate(workingDay.closeTime),
      };
    });
  }
  debugger;
  const specificDay = days.filter((weekDay) => weekDay.day === day);

  const [isWorking, setIsWorking] = useState(specificDay[0].working);

  const openTimeRef = useRef();
  const closeTimeRef = useRef();

  const [openTime, setOpenTime] = useState();
  const [closeTime, setCloseTime] = useState();
  const dispatch = useDispatch();

  function handleSwitchChange(isWorking) {
    setIsWorking(isWorking);

    dispatch({
      type: UPDATEWORKINGSTATE,
      payload: { index, day, isWorking },
    });
  }

  function handleTimeChange(date, name) {
    if (name === "openTime") {
      dispatch({ type: UPDATEOPENTIMESTATE, payload: { index, day, date } });
    } else {
      dispatch({ type: UPDATECLOSETIMESTATE, payload: { index, day, date } });
    }
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
          <DatePicker
            wrapperClassName="timeDatePicker"
            selected={specificDay[0].openTime}
            disabled={!isWorking}
            placeholderText="Choose an hour"
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            onChange={(date) => handleTimeChange(date, "openTime")}
          />
        </div>
        <div className={styles.closeHours}>
          <p>CLOSE</p>{" "}
          {/* <input
            ref={closeTimeRef}
            value={specificDay[0].closeTime}
            name="closeTime"
            onChange={(e) => handleTimeChange(e)}
            type="time"
            step="900"
          ></input> */}
          <DatePicker
            wrapperClassName="timeDatePicker"
            selected={specificDay[0].closeTime}
            placeholderText="Choose an hour"
            disabled={!isWorking}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            onChange={(date) => handleTimeChange(date, "closeTime")}
          />
        </div>
      </div>
    </div>
  );
};

export default DaySelector;
