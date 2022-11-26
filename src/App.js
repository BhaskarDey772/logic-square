import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import { Button, InputGroup, Table } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import "./App.css";
import EditModal from "./components/EditModal";
import { employees } from "./Data/Employee";
import DialogModal from "./components/DialogModal";

const App = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(0);
  const [initial, setInitial] = useState(true);

  const itemPerPage = 5;
  let pages = [];

  const data = localStorage.getItem("employeeList");
  !data && localStorage.setItem("employeeList", JSON.stringify(employees));

  useEffect(() => {
    !initial &&
      localStorage.setItem("employeeList", JSON.stringify(employeeList));
  }, [employeeList]);

  useEffect(() => {
    const data = localStorage.getItem("employeeList");
    if (data) {
      setEmployeeList(JSON.parse(data));
      setInitial(false);
    }
  }, []);

  const totalEmployee = employeeList?.length;

  const checkedEmployee = employeeList?.filter(
    (employee) => employee?.isChecked
  );

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    const updatedEmployeeList = employeeList.map((employee) => {
      if (employee.id === parseInt(value)) {
        employee.isChecked = checked;
      }
      return employee;
    });
    setEmployeeList(updatedEmployeeList);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setDialog(true);
  };

  const handleEdit = (id) => {
    setOpen(true);
    const editEmployee = employeeList.find((employee) => employee.id === id);
    setEditData(editEmployee);
  };

  const handleSave = (id) => {
    for (const key in editData) {
      if (editData[key] === "") {
        alert(`Please fill the ${key}`);
        return;
      }
    }
    const updatedEmployeeList = employeeList.map((employee) => {
      if (employee.id === parseInt(id)) {
        employee = editData;
        setEditData({});
      }
      return employee;
    });
    setEmployeeList(updatedEmployeeList);
    setOpen(false);
    alert("Data updated successfully");
  };

  const handleAdd = () => {
    setOpen(true);
    setEditData({
      id: employeeList.length + 1,
      name: "",
      gender: "",
      age: "",
      designation: "",
      department: "",
      joiningDate: "",
      isChecked: false,
    });
  };

  const updatedEmployeeList = [...employeeList].reverse();

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = updatedEmployeeList?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  for (
    let i = 1;
    i <= Math.ceil(updatedEmployeeList?.length / itemPerPage);
    i++
  ) {
    pages.push(i);
  }

  return (
    <div className="main">
      <Header />
      <div className="first-part">
        <div>
          <p>
            Total Employee:
            <span>{totalEmployee}</span>
          </p>

          <p>
            Checked Employee:
            <span>{checkedEmployee?.length}</span>
          </p>
        </div>

        <Button style={{ width: "200px" }} onClick={handleAdd}>
          <BsPlus size={30} /> Add Employee
        </Button>
      </div>

      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentItems={currentItems}
      />

      <div className="second-part">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Department</th>
              <th>Availablity</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.length > 0 ? (
              currentItems?.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee?.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>
                    <InputGroup.Checkbox
                      aria-label="Checkbox for following text input"
                      value={employee.id}
                      checked={employee.isChecked || false}
                      onChange={handleCheckbox}
                    />
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <Button
                        size="sm"
                        onClick={() => handleEdit(employee?.id)}
                      >
                        <BiEdit size="20px" />
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <MdDeleteOutline size="20px" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <div>
                <h1>No Data Found</h1>
              </div>
            )}
            {}
          </tbody>
        </Table>
      </div>

      <EditModal
        editData={editData}
        setEditData={setEditData}
        setOpen={setOpen}
        handleSave={handleSave}
        open={open}
        employeeList={employeeList}
        setEmployeeList={setEmployeeList}
      />
      <DialogModal
        dialog={dialog}
        setDialog={setDialog}
        employeeList={employeeList}
        setEmployeeList={setEmployeeList}
        deleteId={deleteId}
      />
    </div>
  );
};

export default App;
