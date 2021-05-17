import React from "react";
import styles from "../../../css/Services/EditService.module.css";
import Modal from "react-bootstrap/Modal";
import EditServiceForm from "../Forms/EditServiceForm";
import { FiEdit2, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";

const EditServiceModal = ({ index, service }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  async function handleClick() {}
  return (
    <>
      <button
        className={styles.editButton}
        onClick={(e) => {
          e.preventDefault();
          showModal();
        }}
      >
        {" "}
        <FiEdit2 /> Edit
      </button>
      <Modal id="edit-service-modal" show={isOpen} onHide={hideModal} centered>
        <Modal.Header>
          <Modal.Title>Alert</Modal.Title>
          <button onClick={hideModal}>
            <FiX></FiX>
          </button>
          <Modal.Body className="edit-modal-body">
            <EditServiceForm
              mode="edit-service"
              index={index}
              service={service}
            ></EditServiceForm>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default EditServiceModal;
