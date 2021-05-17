import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import EditServiceForm from "../Forms/EditServiceForm";
import styles from "../../../css/Services/EditService.module.css";
import { FiX } from "react-icons/fi";
import {
  RESETSTATE,
  SETEDITSERVICEMODE,
} from "../../../store/actions/actionTypes";
const AddServiceModal = ({ company, services }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    dispatch({ type: RESETSTATE });

    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    services != null &&
      dispatch({
        type: SETEDITSERVICEMODE,
        services: services.map((service) => [...service.data.workingDays]),
      });
  };

  return (
    <>
      <button
        className={styles.viewButton}
        onClick={(e) => {
          e.preventDefault();
          showModal();
        }}
      >
        Add Service
      </button>
      <Modal id="add-service-modal" show={isOpen} onHide={hideModal} centered>
        <Modal.Header>
          <Modal.Title>Alert</Modal.Title>
          <button onClick={hideModal}>
            <FiX></FiX>
          </button>
          <Modal.Body className="edit-modal-body">
            <EditServiceForm
              mode="add-service"
              index={0}
              company={company}
            ></EditServiceForm>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default AddServiceModal;
