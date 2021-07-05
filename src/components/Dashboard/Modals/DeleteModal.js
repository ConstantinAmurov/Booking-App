import React from "react";
import Modal from "react-bootstrap/Modal";
import styles from "../../../css/Dashboard/Dashboard.module.css";
import "../Companies/css/deletemodal.css";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import {
  deleteCompany,
  deleteService,
  getCompanies,
} from "../../../contexts/DatabaseContext";
import {
  DELETECOMPANY,
  GETCOMPANIES,
  DELETESERVICE,
} from "../../../store/actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";
const deleteImg = require("../../../img/delete.png").default;
const DeleteModal = ({ company }) => {
  const user = useSelector((state) => state.firebase.auth);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  async function handleClick() {
    await deleteCompany(company.id, user.uid);
    dispatch({ type: DELETECOMPANY, companyID: company.id });
    for (const serviceID of company.services) {
      await deleteService(serviceID);
      dispatch({ type: DELETESERVICE, serviceID: serviceID });
    }
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
          <h1>Delete Company</h1>
          <p>
            Are you sure want to delete company ? It can’t be restored after
            take delete action
          </p>
          <button onClick={() => handleClick()} className={styles.submitForm}>
            Yes,Delete
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteModal;
