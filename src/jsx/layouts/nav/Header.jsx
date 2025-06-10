import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Dropdown, Nav } from "react-bootstrap";

import profile from "../../../images/profile/pic1.jpg";
import LogoutPage from "./Logout";
import { ThemeContext } from "../../../context/ThemeContext";
import TicketManagementNavBar from "./TicketManagementNavBar";

const Header = ({ onNote }) => {
  const { background, changeBackground } = useContext(ThemeContext);

  const ThemeChange = () => {
    changeBackground({
      value: background.value === "light" ? "dark" : "light",
    });
  };

  const [fullScreen, setFullScreen] = useState(false);
  const onFullScreen = () => {
    const elem = document.documentElement;
    setFullScreen(true);
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  };

  const offFullScreen = () => {
    setFullScreen(false);
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  };

  const location = useLocation();

  return (
    <div className="header">
      <div className="header-content">
        {location.pathname !== "/dashboard" && (
          <NavLink
            to=""
            className="navbar-brand fs-2 fw-semibold text-uppercase text-primary-custom"
          >
            ZEUS
          </NavLink>
        )}

        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="d-flex justify-content-center w-100">
              <Nav className="justify-content-center" activeKey="/home">
                <Nav.Item>
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${
                        isActive
                          ? "fw-bold text-primary-custom"
                          : "text-dark-custom"
                      }`
                    }
                    to="/dashboard"
                  >
                    Universal Chat
                  </NavLink>
                </Nav.Item>
                {/* <Nav.Item>
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${
                        isActive
                          ? "fw-bold text-primary-custom"
                          : "text-dark-custom"
                      }`
                    }
                    to="/ticket-management"
                  >
                    Ticket Management
                  </NavLink>
                </Nav.Item> */}
                <Nav.Item>
                  <TicketManagementNavBar />
                </Nav.Item>
              </Nav>
            </div>

            <ul className="navbar-nav header-right">
              <Dropdown as="li" className="nav-item dropdown header-profile">
                <Dropdown.Toggle
                  variant=""
                  as="a"
                  className="nav-link i-false c-pointer"
                >
                  <img src={profile} width={20} alt="" />
                  <div className="header-info">
                    <span className="text-primary-custom">
                      Hey, <strong>Omolola</strong>
                    </span>
                    <small className="text-muted">Customer Service Agent</small>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu align="end" className="dropdown-menu-custom">
                  <Link to="/settings" className="dropdown-item ai-icon">
                    <i className="fas fa-cog text-primary-custom me-2" />
                    Settings
                  </Link>
                  <Link to="/ticket-management" className="dropdown-item ai-icon">
                    <i className="fas fa-inbox text-success me-2" />
                    Ticket Management
                  </Link>
                  <LogoutPage />
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
