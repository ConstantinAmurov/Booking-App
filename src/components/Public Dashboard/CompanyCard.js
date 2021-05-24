import React, { useEffect, useState } from "react";
import styles from "../../css/Public Dashboard/CompanyCard.module.css";
import { FiClock, FiBriefcase, FiDollarSign, FiCalendar } from "react-icons/fi";
import { getWorkingDays, getWorkingHours } from "../../contexts/CompanyContext";
import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";
import BookButton from "./Modals/BookServiceModal";
const CompanyCard = ({ service }) => {
  const workingDays = getWorkingDays(service);
  const workingHours = getWorkingHours(service);

  return (
    <div className={styles.companyInfo}>
      <div>
        <img src={service.imgURL}></img>
      </div>
      <div className={styles.info}>
        <h1>{service.companyName}</h1>
        <p> {service.companyDescription}</p>
        <div className={styles.details}>
          <p>
            <FiBriefcase />
            {service.serviceName}
          </p>
          <p>
            {" "}
            <FiClock />{" "}
            {workingHours != null &&
              getHours(workingHours[0]) +
                " : " +
                getMinutes(workingHours[0]) +
                " - " +
                getHours(workingHours[1]) +
                " : " +
                getMinutes(workingHours[1])}
          </p>
          <p>
            {" "}
            <FiDollarSign /> {service.price}
          </p>
          <p>
            {" "}
            <FiCalendar /> {workingDays != null && workingDays.join(", ")}
          </p>
        </div>
        <BookButton service={service}></BookButton>
      </div>
    </div>
  );
};

export default CompanyCard;
