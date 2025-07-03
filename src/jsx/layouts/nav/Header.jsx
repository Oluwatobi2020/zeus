import React, { useContext, useState } from "react";
<<<<<<< HEAD
import { Link, NavLink, useLocation } from "react-router-dom";
import { Dropdown, Nav } from "react-bootstrap";
=======
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button, Dropdown, Nav } from "react-bootstrap";
>>>>>>> dev-tobi

import profile from "../../../images/profile/pic1.jpg";
import LogoutPage from "./Logout";
import { ThemeContext } from "../../../context/ThemeContext";
import TicketManagementNavBar from "./TicketManagementNavBar";
import { useAuth } from "../../../context/AuthContext";
<<<<<<< HEAD
=======
import secureLocalStorage from "react-secure-storage";
import { FaUserAlt } from "react-icons/fa";
import { RiChatNewLine } from "react-icons/ri";
>>>>>>> dev-tobi

const Header = ({ onNote }) => {
  const { background, changeBackground } = useContext(ThemeContext);

  const ThemeChange = () => {
    changeBackground({
      value: background.value === "light" ? "dark" : "light",
    });
  };

  const [fullScreen, setFullScreen] = useState(false);
<<<<<<< HEAD
=======
  const {signOut} = useAuth()
  const userData = secureLocalStorage.getItem("auth");
  const clientName = secureLocalStorage.getItem("clientName");
  const transformedName = userData !== null ? userData?.id?.split(".") : "";

>>>>>>> dev-tobi
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
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> dev-tobi

  return (
    <div className="header">
      <div className="header-content">
<<<<<<< HEAD
=======
        <div className="nav-item d-lg-none" style={{ marginLeft: "-5rem" }}>
          <Button
            onClick={() => navigate("/home")}
            size="sm"
            variant="light"
            className="me-2"
            style={{ fontSize: "0.8em", width: "100px" }}
          >
            {/* <span style={{ marginRight: "1rem" }}>
                </span> */}
            {/* <RiChatNewLine /> */}
            New Chat
          </Button>
        </div>
>>>>>>> dev-tobi
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
                {/* <Nav.Item>
                  <TicketManagementNavBar />
                </Nav.Item> */}
              </Nav>
            </div>

            <ul className="navbar-nav header-right">
              <Dropdown as="li" className="nav-item dropdown header-profile">
                <Dropdown.Toggle
                  variant=""
                  as="a"
<<<<<<< HEAD
                  className="nav-link i-false c-pointer"
                >
                  <img src={profile} width={20} alt="" />
                  <div className="header-info">
                    <span className="text-primary-custom">
                      Hey, <strong>Omolola</strong>
                    </span>
                    <small className="text-muted">Customer Service Agent</small>
=======
                  className="nav-link i-false"
                >
                  {userData?.type === "staff" ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          {/* <img src={profile} width={20} alt="" /> */}
                          <FaUserAlt size={20} color="#11E05A" />
                        </div>
                        {
                          <div
                            className="header-info"
                            style={{ marginTop: "1rem" }}
                          >
                            <span className="text-primary-custom">
                              Welcome,{" "}
                              <strong style={{ textTransform: "capitalize" }}>
                                {transformedName[0]}
                              </strong>
                            </span>
                            <small className="text-muted">
                              Customer Service Agent
                            </small>
                          </div>
                        }
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          {/* <img src={profile} width={20} alt="" /> */}
                          <FaUserAlt size={20} color="#11E05A" />
                        </div>
                        {
                          <div
                            className="header-info"
                            style={{ marginTop: "1rem" }}
                          >
                            <span className="text-primary-custom">
                              Welcome,{" "}
                              <strong style={{ textTransform: "capitalize" }}>
                                {clientName}
                              </strong>
                            </span>
                            <small className="text-muted">Client</small>
                          </div>
                        }
                      </div>
                    </>
                  )}
                  <div style={{ margin: "0.8rem 0 0 0.5rem" }}>
                    <Button
                      style={{
                        fontSize: "0.6em",
                        border: "none",
                        background:
                          "linear-gradient(102.26deg, #64154A 26.32%, #0B449C 74.47%)",
                      }}
                      onClick={signOut}
                    >
                      Logout
                    </Button>
>>>>>>> dev-tobi
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu align="end" className="dropdown-menu-custom">
                  {/* <Link to="/settings" className="dropdown-item ai-icon">
                    <i className="fas fa-cog text-primary-custom me-2" />
                    Settings
                  </Link> */}
                  {/* <Link to="/ticket-management" className="dropdown-item ai-icon">
                    <i className="fas fa-inbox text-success me-2" />
                    Ticket Management
                  </Link> */}
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
