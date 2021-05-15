import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../css/Services/Service.module.css";
import ServiceCard from "./ServiceCard";
const Services = () => {
  const companies = useSelector((state) => state.company.companies);

  return (
    <>
      {" "}
      <div className={styles.services}>
        {companies != null &&
          companies.map((company, index) => (
            <ServiceCard company={company}></ServiceCard>
          ))}
      </div>
    </>
  );
};

export default Services;
