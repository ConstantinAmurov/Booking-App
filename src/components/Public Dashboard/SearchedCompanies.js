import React, { useEffect } from "react";
import CompanyCard from "./CompanyCard";
import styles from "../../css/Public Dashboard/CompanyCard.module.css";
const SearchedCompanies = ({ services }) => {
  return (
    <>
      {services != undefined && (
        <div className={styles.searchedCompanies}>
          {services.map((service, index) => (
            <CompanyCard service={service}></CompanyCard>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchedCompanies;
