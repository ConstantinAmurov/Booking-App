import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "../../../css/Dashboard/Dashboard.module.css";
import "../../../css/Dashboard/ViewCompanyModal.css";
import {
  FiX,
  FiClock,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
} from "react-icons/fi";
import { getServices } from "../../../contexts/DatabaseContext";
const ViewCompanyModal = ({ company }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [services, setServices] = useState(null);
  const [workingDays, setWorkingDays] = useState(null);
  const [workingHours, setWorkingHours] = useState(null);
  useEffect(async () => {
    const services = await getServices(company.services);
    setServices(services);

    setWorkingDays(getWorkingDays(services));
    setWorkingHours(getWorkingHours(services));
  }, []);

  // const services = async (service) => {

  //     if (company.services.length > 0)
  //         service = await getServices(company.services)
  //     else service = [];
  // }
  const getWorkingDays = (services) => {
    const prepareString = (day) => {
      var temp = null;
      temp = day.charAt(0).toUpperCase() + day.slice(1, 3).toLowerCase();
      return temp;
    };

    var servicesWorkingDays = [];
    debugger;
    services.map((service) => {
      var serviceWorkingDays = [];

      service.data.workingDays.map((weekDay) => {
        const day = prepareString(weekDay.day);
        weekDay.working == true && serviceWorkingDays.push(day);
      });
      servicesWorkingDays.push(serviceWorkingDays);
    });

    return servicesWorkingDays;
  };
  const getWorkingHours = (services) => {
    var openHours = [];
    var closeHours = [];

    function toDate(dStr, format) {
      var time = new Date();
      if (format == "h:m") {
        time.setHours(dStr.substr(0, dStr.indexOf(":")));
        time.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
        return time;
      } else return "Invalid Format";
      debugger;
    }

    services.map((service) => {
      service.data.workingDays.map((weekDay) => {
        debugger;
        weekDay.working == true &&
          openHours.push(toDate(weekDay.openTime, "h:m").getHours());
        weekDay.working == true &&
          closeHours.push(toDate(weekDay.closeTime, "h:m").getHours());
      });
    });

    const minOpenHour = Math.min(...openHours);
    const minCloseHour = Math.min(...closeHours);

    return [minOpenHour, minCloseHour];
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  console.log(workingDays);
  return (
    <>
      <button
        className={styles.viewButton}
        onClick={(e) => {
          e.preventDefault();
          showModal();
        }}
      >
        View Company
      </button>

      <Modal
        dialogClassName="modal-view"
        show={isOpen}
        onHide={hideModal}
        centered
      >
        <Modal.Header>
          <Modal.Title>View Company</Modal.Title>
          <button onClick={hideModal}>
            <FiX></FiX>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div class="company-info">
            <div class="img">
              <img src={company.imgURL}></img>
            </div>

            <div class="info">
              <h1>{company.name}</h1>
              <p> {company.description}</p>

              {services != null &&
                services.map((service, index) => {
                  return (
                    <div id={service.id} class="details">
                      <p>
                        <FiBriefcase />
                        {service.data.serviceName}{" "}
                      </p>
                      <p>
                        {" "}
                        <FiClock />{" "}
                        {workingHours != null &&
                          workingHours[0] + " - " + workingHours[1]}
                      </p>
                      <p>
                        {" "}
                        <FiDollarSign /> {service.data.price}
                      </p>
                      <p>
                        {" "}
                        <FiCalendar />{" "}
                        {workingDays != null && workingDays[index].join(", ")}
                      </p>
                      <button class="book-button">Book Service</button>
                    </div>
                  );
                })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewCompanyModal;
