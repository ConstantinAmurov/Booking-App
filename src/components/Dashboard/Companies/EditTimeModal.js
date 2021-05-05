import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FiX } from "react-icons/fi";
import styles from "../../../css/Dashboard/Dashboard.module.css";
import "../../../css/Dashboard/AddCompanyModal.css";
import "bootstrap/dist/css/bootstrap.min.css";

import DaySelector from "./DaySelector";

const EditTimeModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const showModal = () => {
    setIsOpen(true);
    document.getElementById("company-modal").style.opacity = "0";
  };

  const hideModal = () => {
    setIsOpen(false);
    document.getElementById("company-modal").style.opacity = "1";
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
          <DaySelector></DaySelector>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditTimeModal;
