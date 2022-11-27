import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const EditModal = ({
  setEmployeeList,
  employeeList,
  editData,
  setEditData,
  open,
  setOpen,
  handleSave,
}) => {
  const flag = employeeList?.some((employee) => employee?.id === editData.id);
  const handleAdd = () => {
    for (const key in editData) {
      if (editData[key] === "") {
        alert(`Please fill the ${key}`);
        return;
      }
    }
    setEmployeeList([...employeeList, editData]);
    setOpen(false);
    alert("Data added successfully");
    setEditData({});
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value || e.target.checked,
    });
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setEditData({ ...editData, isChecked: checked });
  };

  return (
    <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={editData.name}
              name="name"
              required
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <select
              class="form-select"
              aria-label="Default select example"
              required
              name="gender"
              onChange={handleChange}
              value={editData?.gender}
            >
              <option selected>Open this select menu</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Age"
              aria-label="Age"
              aria-describedby="basic-addon1"
              value={editData?.age}
              type="number"
              required
              name="age"
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Designation"
              required
              aria-label="Designation"
              name="designation"
              aria-describedby="basic-addon1"
              value={editData?.designation}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup className="mb-3" required>
            <Form.Control
              placeholder="Department"
              required
              aria-label="Department"
              name="department"
              aria-describedby="basic-addon1"
              value={editData.department}
              onChange={handleChange}
            />
          </InputGroup>
          <div style={{ display: "flex", alignItems: "center" }}>
            <InputGroup.Checkbox
              ria-label="Checkbox for following text input"
              name="isChecked"
              checked={editData?.isChecked || false}
              onChange={handleCheckbox}
              style={{ marginBottom: "1rem" }}
            />
            <span>Availablity</span>
          </div>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Joining Date"
              required
              name="joiningDate"
              aria-label="Joining Date"
              aria-describedby="basic-addon1"
              value={editData.joiningDate}
              type="date"
              onChange={handleChange}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>

          {flag ? (
            <Button variant="primary" onClick={() => handleSave(editData.id)}>
              Save Changes
            </Button>
          ) : (
            <Button variant="danger" onClick={handleAdd}>
              Add
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditModal;
