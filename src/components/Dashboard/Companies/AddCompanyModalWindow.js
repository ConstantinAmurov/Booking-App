import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../../css/Dashboard/Dashboard.module.css";
//import "../../../css/Dashboard/AddCompanyModal.css";
import { FiX } from "react-icons/fi";
import Profile from "./Sections/Profile";
import Services from "./Sections/Services";

const AddCompanyModalWindow = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = useState(<Profile></Profile>);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setActiveSection(<Profile></Profile>);
  };
  function setProfileSection() {
    activeSection = <Profile></Profile>;
  }
  function setProfileSection() {
    setActiveSection(<Profile mode={"add-company"}></Profile>);
  }
  function setServicesSection() {
    setActiveSection(<Services></Services>);
  }

  return (
    <>
      <button onClick={showModal}>+</button>
      <Modal id="company-modal" show={isOpen} onHide={hideModal} centered>
        <Modal.Header>
          <Modal.Title>Add Company</Modal.Title>
          <button onClick={hideModal}>
            <FiX></FiX>
          </button>
          <div className={styles.topButtons}>
            <button onClick={() => setProfileSection()}>PROFILE</button>
            <button onClick={() => setServicesSection()}>SERVICES</button>
            <button>PAYMENT</button>
          </div>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>{activeSection}</Modal.Body>
        {/* <Modal.Footer>
          <button>Save</button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default AddCompanyModalWindow;
