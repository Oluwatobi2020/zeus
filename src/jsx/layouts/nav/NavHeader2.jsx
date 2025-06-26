import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { ThemeContext } from "../../../context/ThemeContext";

/// images
import logo from "../../../images/logo-white.png";
import logoText from "../../../images/logo-text-white.png";

const NavHeader2 = ({ openSidebar }) => {
  const { openMenuToggle } = useContext(ThemeContext);

  return (
    <div className="nav-header">
      {/* <Link to="/dashboard" className="brand-logo">
          <img className="logo-abbr" src={logo} alt="" />
          <img className="logo-compact" src={logoText} alt="" />
          <img className="brand-title" src={logoText} alt="" />
      </Link> */}

      {/* <div
        className="nav-control"
        onClick={() => {
          handleToogle();
          openMenuToggle();
        }}
      >
        {/* <div
          className={`hamburger  ${
            openSidebar ? "d-none" : ""
          }`}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div> 
      </div> */}
    </div>
  );
};

export default NavHeader2;
