import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DialogModal = ({
  dialog,
  setDialog,
  employeeList,
  setEmployeeList,
  deleteId,
}) => {
  const handleDelete = () => {
    const updatedEmployeeList = employeeList.filter(
      (employee) => employee.id !== deleteId
    );
    setEmployeeList(updatedEmployeeList);
    setDialog(false);
  };

  const handleClose = () => {
    setDialog(false);
  };

  return (
    <div className="dialog-modal" onClick={(e) => e.stopPropagation()}>
      <Modal show={dialog} onHide={() => setDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do You Really Want To Delete This Employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DialogModal;
