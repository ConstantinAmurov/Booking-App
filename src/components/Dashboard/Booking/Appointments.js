import React, { useState, useEffect } from "react";
import styles from "../../../css/Services/Appointments.module.css";
import { useSelector } from "react-redux";
import { getReservations } from "../../../contexts/DatabaseContext";
import format from "date-fns/format";
import firebase from "../../../Firebase";

import intervalToDuration from "date-fns/intervalToDuration";
// import toDate from "date-fns/toDate";
const Appointments = () => {
  const [companyReservations, setCompanyReservations] = useState();

  useEffect(async () => {
    var companyReservations = await getReservations();

    setCompanyReservations(companyReservations);
  }, []);

  return (
    <>
      {companyReservations &&
        companyReservations.map((reservation) => (
          <section>
            <div className={styles.companyName}>
              <h1>{reservation.companyName}</h1>
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

            {reservation.reservations.map((clientReservation) => (
              <>
                <div className={styles.appointment}>
                  <div className={styles.info}>
                    <h3>
                      {" "}
                      {clientReservation.clientInfo.firstName}{" "}
                      {clientReservation.clientInfo.lastName}
                    </h3>
                    <p> {clientReservation.clientInfo.email}</p>
                    <p> {clientReservation.clientInfo.phone}</p>
                  </div>
                  <div className={styles.info}>
                    <p> {clientReservation.serviceName}</p>
                  </div>
                  <div className={styles.info}>
                    <h3>
                      {" "}
                      {format(
                        clientReservation.startTime.toDate(),
                        "MM/dd/yyyy"
                      )}
                    </h3>
                    <p>
                      {format(
                        clientReservation.startTime.toDate(),
                        "KK:mm aaa"
                      )}
                      {" - "}
                      {format(clientReservation.endTime.toDate(), "KK:mm aaa")}
                    </p>
                  </div>
                  <div className={styles.info}>
                    <h3>
                      {
                        intervalToDuration({
                          start: clientReservation.startTime.toDate(),
                          end: clientReservation.endTime.toDate(),
                        }).hours
                      }
                      {"h "}
                      {
                        intervalToDuration({
                          start: clientReservation.startTime.toDate(),
                          end: clientReservation.endTime.toDate(),
                        }).minutes
                      }
                      {"min"}
                    </h3>
                  </div>
                  <div className={styles.info}>
                    <h3>{clientReservation.price} RON</h3>
                  </div>
                  <div className={styles.info}>
                    <h3>
                      {clientReservation.capacity}{" "}
                      {clientReservation.capacity > 1 ? "Persons" : "Person"}
                    </h3>
                  </div>
                </div>
                <hr className={styles.customHr}></hr>
              </>
            ))}
          </section>
        ))}
    </>
  );
};

export default Appointments;
