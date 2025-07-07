import { Link, NavLink, useLocation } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";

import { useAuth } from "../../../context/AuthContext";
import secureLocalStorage from "react-secure-storage";
import { FaUserAlt } from "react-icons/fa";
import { useChat } from "../../../context/ChatContext";
import { STAFF_TYPE } from "../../constant/user";
import CoralpayLogo from "../../../images/coralpay-logo.png";

const Header = ({ onNote }) => {
  const { signOut } = useAuth();

  const userData = secureLocalStorage.getItem("auth");
  const clientName = secureLocalStorage.getItem("clientName");
  const transformedName = userData !== null ? userData?.id?.split(".") : "";

  const location = useLocation();

  const {
    startConversation,
    startConversationForDocumentation,
    selectedChannel,
    resetChat,
  } = useChat();

  const handleStartNewChat = () => {
    resetChat();
    if (!selectedChannel && userData.type === STAFF_TYPE) {
      startConversation();
      return;
    } else {
      startConversationForDocumentation();
    }
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="nav-item d-lg-none" style={{ marginLeft: "-5rem" }}>
          <div className="d-flex align-items-center gap-1">
            <Link to="/home">
              <img
                src={CoralpayLogo}
                width={50}
                height={50}
                alt="coralpay-logo"
              />
            </Link>
            <Button
              onClick={handleStartNewChat}
              size="sm"
              variant="light"
              className="me-2"
              style={{ fontSize: "0.8em", width: "100px" }}
            >
              New Chat
            </Button>
          </div>
        </div>
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
            <div className="d-flex justify-content-center align-items-center  w-100">
              {selectedChannel && (
                <p className="mb-0">{selectedChannel.key.toUpperCase()}</p>
              )}
            </div>

            <ul className="navbar-nav header-right">
              <Dropdown as="li" className="nav-item dropdown header-profile">
                <Dropdown.Toggle variant="" as="a" className="nav-link i-false">
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
                        <FaUserAlt size={20} color="#11E05A" />

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
                  </div>
                </Dropdown.Toggle>
              </Dropdown>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
