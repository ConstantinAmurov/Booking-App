import React from "react";
import Modal from "react-bootstrap/Modal";
// import styles from "../../Dashboard/Companies/css/deletemodal.css";
import styles from "../../../css/Services/Service.module.css";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { deleteService } from "../../../contexts/DatabaseContext";
import { DELETESERVICE } from "../../../store/actions/actionTypes";

const deleteImg = require("../../../img/delete.png").default;
const DeleteButtonModal = ({ serviceId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  async function handleClick() {
    await deleteService(serviceId);
    debugger;
    dispatch({ type: DELETESERVICE, serviceID: serviceId });
  }
  return (
    <>
      <button
        className={styles.deleteButton}
        onClick={(e) => {
          e.preventDefault();
          showModal();
        }}
      >
        {" "}
        <FiTrash2 /> Delete
      </button>

      <Modal show={isOpen} onHide={hideModal} centered>
        <Modal.Header>
          <Modal.Title>Alert</Modal.Title>
          <button onClick={hideModal}>
            <FiX></FiX>
          </button>
        </Modal.Header>
        <Modal.Body className="delete-modal-body">
          <img src={deleteImg}></img>
          <h1>Delete Service</h1>
          <p>
            Are you sure want to delete service ? It can’t be restored after
            take delete action
          </p>
          <button onClick={() => handleClick()} className={styles.submitButton}>
            Yes,Delete
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteButtonModal;
