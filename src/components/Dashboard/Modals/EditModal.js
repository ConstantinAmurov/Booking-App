import React from "react";
import Modal from "react-bootstrap/Modal";
import { FiEdit2, FiX } from "react-icons/fi";
import styles from "../../../css/Dashboard/Dashboard.module.css";
import moduleStyles from "./css/EditModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import EditCompanyForm from "./EditCompanyForm";
const EditModal = ({ company }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  debugger;
  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => showModal()} className={styles.editButton}>
        {" "}
        <FiEdit2 /> Edit
      </button>
      <Modal id="company-modal" show={isOpen} onHide={hideModal} centered>
        <Modal.Header>
          <Modal.Title>Edit Company</Modal.Title>
          <button onClick={hideModal}>
            <FiX></FiX>
          </button>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <EditCompanyForm company={company}></EditCompanyForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditModal;
