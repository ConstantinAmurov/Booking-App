import React, { useState } from "react";
import styles from "../../css/Public Dashboard/Search.module.css";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/DatePicker.css";
import { getServicesByName } from "../../contexts/DatabaseContext";
import { useSelector } from "react-redux";
import {
  filterServices,
  filterCompaniesByServices,
} from "../../services/Search.service";

const Search = ({ handleSearchSubmit }) => {
  const allServices = useSelector((state) => state.services.allServices);
  const [filteredCompanies, setFilteredCompanies] = useState();
  const formik = useFormik({
    initialValues: {
      serviceName: "",
      date: new Date(),
    },
    onSubmit: async (values) => {
      if (allServices != null) {
        const foundServices = filterServices(
          values.serviceName,
          allServices,
          values.date.getDay()
        );

        const filteredServices = await filterCompaniesByServices(foundServices);

        handleSearchSubmit(filteredServices);
      }
    },
  });
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div className={styles.searchContainer}>
        <form className={styles.customForm} onSubmit={formik.handleSubmit}>
          <div className={styles.input}>
            <label className="text-left" for="serviceName">
              Service
            </label>
            <input
              type="text"
              className={styles.customInput}
              id="serviceName"
              name="serviceName"
              value={formik.values.serviceName}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className={styles.input}>
            <label className="text-left" for="date">
              Date
            </label>

            <DatePicker
              wrapperClassName="searchDatePicker"
              selected={formik.values.date}
              onChange={(date) => formik.setFieldValue("date", date)}
              minDate={new Date()}
              placeholderText="Select a day"
            ></DatePicker>
          </div>
          <div className={styles.input}>
            <button className={styles.customButton} type="submit">
              {" "}
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
