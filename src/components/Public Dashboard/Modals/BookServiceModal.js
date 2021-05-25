import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "../../../css/Public Dashboard/BookServiceModal.module.css";
import { FiEdit2, FiX } from "react-icons/fi";
import BookService from "../Forms/BookServiceForm";
import UserInformation from "../Forms/UserInformationForm";
import Confirmation from "../Confirmation";
import addMinutes from "date-fns/addMinutes";
const BookServiceModal = ({ service }) => {
  const handleSectionChange = (section, values) => {
    if (section == "user-information") {
      setSection(
        <UserInformation
          handleSectionChange={handleSectionChange}
          handleUserChange={handleUserChange}
          reservationInfo={{
            serviceId: service.id,
            startTime: values.hour,
            endTime: addMinutes(values.hour, values.duration),
            capacity: values.capacity,
          }}
        />
      );
    }
    if (section == "confirmation") {
      setSection(
        <Confirmation
          values={{
            ...values,
            capacity: service.capacity,
            serviceName: service.serviceName,
            companyName: service.companyName,
          }}
        ></Confirmation>
      );
    }
    if (section == "book-service") {
      setSection(
        <BookService
          service={service}
          handleSectionChange={handleSectionChange}
        />
      );
    }
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = useState();
  const [section, setSection] = useState(
    <BookService service={service} handleSectionChange={handleSectionChange} />
  );
  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setSection(
      <BookService
        service={service}
        handleSectionChange={handleSectionChange}
      />
    );
    setIsOpen(false);
  };

  const handleUserChange = (user) => {
    setUser(user);
  };

  return (
    <>
      <button
        className={styles.bookButton}
        onClick={(e) => {
          e.preventDefault();
          showModal();
        }}
      >
        Book Service
      </button>

      <Modal id="book-service-modal" show={isOpen} onHide={hideModal} centered>
        <Modal.Header>
          <button onClick={hideModal}>
            <FiX></FiX>
          </button>
          <Modal.Title className={styles.title}>
            {service.companyName}
          </Modal.Title>
          <p className={styles.subTitle}>BOOKING SERVICE</p>
        </Modal.Header>
        <Modal.Body className="edit-modal-body">{section}</Modal.Body>
      </Modal>
    </>
  );
};

export default BookServiceModal;
