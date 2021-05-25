import React from "react";
import styles from "../../../css/Booking/Booking.module.css";
import FilterButton from "./Modals/FilterBookingModal";
import Appointment from "./Appointments";
const Main = () => {
  return (
    <div className={styles.main}>
      <h1>Booking</h1>
      <FilterButton></FilterButton>
      <div className={styles.appointments}>
        <div className={styles.appointment}>
          <Appointment></Appointment>
        </div>
      </div>
    </div>
  );
};

export default Main;
