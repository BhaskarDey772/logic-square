import React from "react";
import logo from "../Assets/logo.png";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="Logo" />
      <p>Page Name</p>
    </div>
  );
};

export default Header;
