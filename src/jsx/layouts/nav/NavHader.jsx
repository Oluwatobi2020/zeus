import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { navtoggle } from "../../../store/actions/AuthActions";
import { ThemeContext } from "../../../context/ThemeContext";

/// images
import logo from "../../../images/logo-white.png";
import logoText from "../../../images/logo-text-white.png";

const NavHader = () => {
  const { openMenuToggle } = useContext(ThemeContext);

  const handleToogle = () => {
    
  };
  return (
    <div className="nav-header">
      <Link to="/dashboard" className="brand-logo">
        <img className="logo-abbr" src={logo} alt="" />
        <img className="logo-compact" src={logoText} alt="" />
        <img className="brand-title" src={logoText} alt="" />
      </Link>

      {/* <div
        className="nav-control"
        onClick={() => {
          handleToogle();
          openMenuToggle();
        }}
      >
        <div className={`hamburger ${sideMenu ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div> */}
    </div>
  );
};

export default NavHader;
