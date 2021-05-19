import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FiX } from "react-icons/fi";
import styles from "../../../css/Dashboard/Dashboard.module.css";
import "../../../css/Dashboard/AddCompanyModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { RESETSTATE } from "../../../store/actions/actionTypes";
import DaySelector from "./DaySelector";

const EditTimeModal = ({ index, service, mode }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const showModal = () => {
    setIsOpen(true);

    if (mode == "edit-service") {
      document.getElementById("edit-service-modal").style.opacity = "0";
    } else if (mode == "add-service") {
      document.getElementById("add-service-modal").style.opacity = "0";
    } else {
      document.getElementById("company-modal").style.opacity = "0";
    }
  };

  const hideModal = () => {
    setIsOpen(false);
    if (mode == "edit-service") {
      document.getElementById("edit-service-modal").style.opacity = "1";
    } else if (mode == "add-service") {
      document.getElementById("add-service-modal").style.opacity = "1";
    } else {
      document.getElementById("company-modal").style.opacity = "1";
    }
  };
  return (
    <>
      <div className={styles.editAvailabityButton} onClick={showModal}>
        EDIT
      </div>
      <Modal id="edit-time-modal" show={isOpen} onHide={hideModal} centered>
        <Modal.Header>
          <Modal.Title>Edit Time</Modal.Title>
          <button onClick={hideModal}>
            <FiX></FiX>
          </button>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <DaySelector
            index={index}
            service={service}
            mode={mode}
            day="SUNDAY"
          ></DaySelector>
          <DaySelector
            index={index}
            service={service}
            mode={mode}
            day="MONDAY"
          ></DaySelector>
          <DaySelector
            index={index}
            service={service}
            mode={mode}
            day="TUESDAY"
          ></DaySelector>
          <DaySelector
            index={index}
            service={service}
            mode={mode}
            day="WEDNESDAY"
          ></DaySelector>
          <DaySelector
            index={index}
            service={service}
            mode={mode}
            day="THURSDAY"
          ></DaySelector>
          <DaySelector
            index={index}
            service={service}
            mode={mode}
            day="FRIDAY"
          ></DaySelector>
          <DaySelector
            index={index}
            service={service}
            mode={mode}
            day="SATURDAY"
          ></DaySelector>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditTimeModal;
