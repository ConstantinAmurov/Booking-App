import React, { useState, useEffect } from "react";
import styles from "../../css/Services/Service.module.css";
import { getServices } from "../../contexts/DatabaseContext";
import DeleteButton from "./Modals/DeleteServiceModal";
import EditButton from "./Modals/EditServiceModal";
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
  }, []);
  debugger;

  services != null &&
    dispatch({
      type: SETEDITSERVICEMODE,
      services: services.map((service) => [...service.data.workingDays]),
    });

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

          <ViewCompany company={company}></ViewCompany>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;

// return (
//     <div className={styles.companies}>
//       {props.companies.length &&
//         props.companies.map((company, index) => (
//           <div key={index} className={styles.company}>
//             <div className={styles.details}>
//               <div>
//                 <img src={company.imgURL} alt="" />
//               </div>
//               <div className={styles.info}>
//                 <h1>{company.name}</h1>
//                 {company.status === true ? (
//                   <p>
//                     Status: <span className={styles.active}>Active</span>
//                   </p>
//                 ) : (
//                   <p>
//                     Status:{" "}
//                     <span className={styles.notActive}> Not Active</span>
//                   </p>
//                 )}
//                 <p>{company.description}</p>
//               </div>
//             </div>
//             <div className={styles.buttons}>
//               <button className={styles.editButton}>
//                 {" "}
//                 <FiEdit2 /> Edit
//               </button>
//               <DeleteButton company={company}></DeleteButton>
//               <ViewCompany company={company}></ViewCompany>
//               {/* <button className={styles.viewButton}> View company</button> */}
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

// description
// "Trimming Business"
// imgURL
// "https://firebasestorage.googleapis.com/v0/b/booking-app-3d5da.appspot.com/o/Kotta%20Logo%20v2%20varianta%20NEGRU.svg?alt=media&token=24254280-5696-4361-871e-da1018ca1bbf"
// name
// "Company Alpha"
// services
// 0
// "lIGH041phaPQPcPSNiR2"
// status
// false
