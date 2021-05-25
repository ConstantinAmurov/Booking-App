import React from "react";
import Modal from "react-bootstrap/Modal";
import styles from "../../../../css/Booking/Booking.module.css";
import { FiX, FiFilter } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Selector from "../../../Selector";
const FilterBookingModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();

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
        className={styles.filterButton}
        onClick={(e) => {
          e.preventDefault();
          showModal();
        }}
      >
        {" "}
        <FiFilter /> Filter
      </button>
      <Modal
        className={styles.filterModalBody}
        show={isOpen}
        onHide={hideModal}
        centered
      >
        <Modal.Header>
          <button onClick={hideModal}>
            <FiX></FiX>
          </button>
          <Modal.Title>Filter</Modal.Title>
          <p>FILTER BOOKING</p>
        </Modal.Header>
        <Modal.Body>
          <Selector placeholder={"Service"} name option={[]}></Selector>
          <Selector placeholder={"Booking time"} name option={[]}></Selector>
          <Selector placeholder={"Duration"} name option={[]}></Selector>
          <button type="submit" className={styles.submitForm}>
            Apply Filter
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FilterBookingModal;
