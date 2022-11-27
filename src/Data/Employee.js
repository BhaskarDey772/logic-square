// import uuid and generate uniwue id

import { v4 as uuid } from "uuid";

export const employees = [
  {
    id: uuid(),
    name: "John Doe",
    gender: "Male",
    age: 35,
    designation: "Software Engineer",
    department: "IT",
    joiningDate: "2019-01-01",
    isChecked: false,
  },
  {
    id: uuid(),
    name: "John Doe",
    gender: "Male",
    age: 35,
    designation: "Software Engineer",
    department: "IT",
    joiningDate: "2010-01-02",
    isChecked: true,
  },
];
