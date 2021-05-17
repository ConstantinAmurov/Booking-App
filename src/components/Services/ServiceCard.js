import React, { useState, useEffect } from "react";
import styles from "../../css/Services/Service.module.css";
import { getServices } from "../../contexts/DatabaseContext";
import DeleteButton from "./Modals/DeleteServiceModal";
import EditButton from "./Modals/EditServiceModal";
import AddButton from "./Modals/AddServiceModal";
import ViewCompany from "../Dashboard/Modals/ViewCompanyModal";

import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { getWorkingDays } from "../../contexts/CompanyContext";
import { useDispatch } from "react-redux";
import {
  SETEDITSERVICEMODE,
  SETADDSERVICEMODE,
} from "../../store/actions/actionTypes";
const ServiceCard = ({ company }) => {
  const dispatch = useDispatch();
  const [services, setServices] = useState(null);
  const [workingDays, setWorkingDays] = useState(null);

  useEffect(async () => {
    const services = await getServices(company.services);
    setServices(services);
    const workingDays = getWorkingDays(services);
    setWorkingDays(workingDays);
    services != null &&
      dispatch({
        type: SETEDITSERVICEMODE,
        services: services.map((service) => [...service.data.workingDays]),
      });
  }, []);
  debugger;

  return (
    <div id={company.id} className={styles.companyServices}>
      {company != null && (
        <div className={styles.info}>
          <h1>{company.name}</h1>
          {services != null &&
            services.map((service, index) => (
              <div key={index} id={services.id} className={styles.service}>
                <h3>Service name</h3>
                <p>{service.data.serviceName}</p>
                <h3>Description</h3>
                <p>{service.data.description}</p>
                <h3>Availability</h3>
                <p> {workingDays != null && workingDays[index].join(", ")}</p>
                <h3>Capacity</h3>
                <p>
                  {service.data.capacity}{" "}
                  {service.data.capacity === 1 ? "persons" : "persons"}{" "}
                </p>
                <h3>Duration</h3>
                <p>{service.data.duration} Minutes</p>
                <h3>Price</h3>
                <p>{service.data.price} RON</p>
                <div className={styles.buttons}>
                  <EditButton index={index} service={service}></EditButton>
                  <DeleteButton serviceId={service.id}></DeleteButton>
                  {/* <button className={styles.viewButton}> View company</button> */}
                </div>
                <p>{services.length > 1 ? <hr /> : ""}</p>
              </div>
            ))}
          <AddButton company={company} services={services}></AddButton>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
