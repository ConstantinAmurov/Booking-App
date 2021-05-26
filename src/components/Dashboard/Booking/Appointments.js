import React, { useState, useEffect } from "react";
import styles from "../../../css/Services/Appointments.module.css";
import { useSelector } from "react-redux";
import { getReservations } from "../../../contexts/DatabaseContext";
const Appointments = () => {
  const [reservations, setReservations] = useState();

  useEffect(async () => {
    var reservations = await getReservations();
    setReservations(reservations);
  }, []);

  return (
    <>
      <div className={styles.companyName}>
        <h1>Company Alpha</h1>
        <p>BOOKING APPOINTMENT</p>
      </div>
      <div className={styles.fields}>
        <p>Customer name</p>
        <p>Service</p>
        <p>Booking time</p>
        <p>Duration</p>
        <p>Total price</p>
        <p>Capacity</p>
      </div>
      <div className={styles.appointment}>
        <div className={styles.info}>
          <h3>Michael Jackson</h3>
          <p>jackson@gmail.com</p>
          <p>041-9088-9088</p>
        </div>
        <div className={styles.info}>
          <h3>Trimming</h3>
        </div>
        <div className={styles.info}>
          <h3>20/10/2021</h3>
          <p>08.00- 09.30</p>
        </div>
        <div className={styles.info}>
          <h3>90 minutes</h3>
        </div>
        <div className={styles.info}>
          <h3>30 RON</h3>
        </div>
        <div className={styles.info}>
          <h3>1 Person</h3>
        </div>
      </div>
      <hr className={styles.customHr}></hr>
    </>
  );
};

export default Appointments;
