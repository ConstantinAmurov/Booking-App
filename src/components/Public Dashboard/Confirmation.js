import React from "react";
import confirmImg from "../../img/Confirmation.svg";
import styles from "../../css/Public Dashboard/Confirmation.module.css";
import format from "date-fns/format";
import { getHours } from "date-fns";
import getDay from "date-fns/getDay";
import { getDayName } from "../../services/Search.service";
import getMinutes from "date-fns/getMinutes";
import emailjs from "emailjs-com";
import emailjsParams from "../../EmailJS";
const Confirmation = ({ values }) => {
  const emailParams = {
    phone: values.phone,
    email: values.email,
    to_name: values.firstName,
    from_name: "Booking App",
    reply_to: "booking.app.md@gmail.com",
    capacity: values.capacity,
    company_name: values.companyName,
    service_name: values.serviceName,
    reservation_id: values.reservationId,
    date: format(values.startTime, "MM/dd/yyyy"),
    hour: getHours(values.startTime) + ":" + getMinutes(values.startTime),
  };

  emailjs
    .send(
      emailjsParams.SERVICE_ID,
      emailjsParams.TEMPLATE_ID,
      emailParams,
      emailjsParams.USER_ID
    )
    .then((response) => {
      console.log("Email succesfully sent!", response.status, response.text);
    });

  return (
    <div className={styles.confirmation}>
      <img src={confirmImg}></img>
      <h1>Congratulations</h1>
      <p>
        {" "}
        Hi {values.firstName}, Appointment confirmed with {values.companyName}{" "}
        on {getDayName(getDay(values.startTime))}{" "}
        {format(values.startTime, "MM/dd/yyyy")} at {getHours(values.startTime)}
        :{getMinutes(values.startTime)}, please find the details below
      </p>
      <button className={styles.bookButton}>Check Email</button>
    </div>
  );
};

export default Confirmation;
