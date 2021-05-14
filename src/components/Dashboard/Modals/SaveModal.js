import React from "react";
import Modal from "react-bootstrap/Modal";
import styles from "../../../css/Dashboard/Dashboard.module.css";
// import "../../../css/Dashboard/AddCompanyModal.css";
import "bootstrap/dist/css/bootstrap.min.css";

const TemplateModal = ({ services, confirmSave, errors, touched }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    if (
      services === undefined &&
      Object.entries(errors).length === 0 &&
      Object.entries(touched).length != 0
    ) {
      setIsOpen(true);
      document.getElementById("company-modal").style.opacity = "0";
    } else {
      confirmSave();
    }
  };

  const hideModal = () => {
    setIsOpen(false);
    document.getElementById("company-modal").style.opacity = "1";
  };

  return (
    <>
      <button
        className={styles.submitForm}
        onClick={(e) => {
          e.preventDefault();
          showModal();
        }}
      >
        {" "}
        Save Profile
      </button>
      <Modal
        className={styles.saveModal}
        show={isOpen}
        onHide={hideModal}
        centered
      >
        <Modal.Header>
          <Modal.Title>Confirm Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1 className={styles.centeredText}>
            Are you sure you want to save the companies without the services?
          </h1>
          <button
            className={styles.confirmButton}
            onClick={() => {
              confirmSave();
              hideModal();
            }}
          >
            {" "}
            Yes
          </button>
          <button className={styles.denyButton} onClick={() => hideModal()}>
            No
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TemplateModal;
