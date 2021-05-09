import React from "react";
import Modal from "react-bootstrap/Modal";

import "bootstrap/dist/css/bootstrap.min.css";
const TemplateModal = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const { buttonText, headerText, bodyText } = props;

  return (
    <>
      <Modal show={isOpen} onHide={hideModal} centered>
        <Modal.Header>
          <Modal.Title>{headerText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyText}</Modal.Body>
        <Modal.Footer>
          <button>Yes</button>
          <button>No</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TemplateModal;
