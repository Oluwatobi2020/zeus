import { Fragment, useState } from "react";
import { Tab, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Header from "./Header";
import ChatBox from "../ChatBox";
import CoralpayLogo from "../../../images/coralpay-logo.png";

import { RiChatNewLine } from "react-icons/ri";
import { useChat } from "../../../context/ChatContext";
import { useAuth } from "../../../context/AuthContext";
import { CLIENT_TYPE } from "../../constant/user";

const Deflayout = ({ title, onClick: ClickToAddEvent }) => {
  const [toggle, setToggle] = useState("");
  const onClick = (name) => setToggle(toggle === name ? "" : name);

  const {
    startConversation,
    startConversationForDocumentation,
    selectedChannel,
    resetChat,
  } = useChat();

  const { userData } = useAuth();

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleStartNewChat = () => {
    resetChat();
    if (!selectedChannel && userData.type !== CLIENT_TYPE) {
      startConversation();
      return;
    } else {
      startConversationForDocumentation();
    }
  };

  return (
    <Fragment>
      <ChatBox onClick={() => onClick("chatbox")} toggle={toggle} />
      <Tab.Container defaultActiveKey={"Dashboard"}>
        <div className={`fixed-content-box ${openSidebar ? "active" : ""}`}>
          <div className="head-name">
            <Link to="/home" className="d-flex align-items-center">
              <img
                src={CoralpayLogo}
                width={50}
                height={50}
                alt="coralpay-logo"
              />
              <p className="mb-0">ZEUS</p>
            </Link>
            <span
              className="close-fixed-content fa-left d-md-none"
              onClick={() => setOpenSidebar(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <polygon points="0 0 24 0 24 24 0 24" />
                  <rect
                    fill="#000000"
                    opacity="0.3"
                    transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) "
                    x="14"
                    y="7"
                    width="2"
                    height="10"
                    rx="1"
                  />
                  <path
                    d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z"
                    fill="#000000"
                    fillRule="nonzero"
                    transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) "
                  />
                </g>
              </svg>
            </span>
          </div>
          <div className="fixed-content-body dz-scroll" id="DZ_W_Fixed_Contant">
            <Tab.Content>
              <div
                className="tab-pane chart-sidebar fade show active"
                role="tabpanel"
              >
                <div className="card">
                  <div className="card-header align-items-center">
                    <Button
                      onClick={handleStartNewChat}
                      size="small"
                      variant="light"
                      className="me-2"
                    >
                      <span style={{ marginRight: "1rem" }}>
                        <RiChatNewLine />
                      </span>{" "}
                      Start New Chat
                    </Button>
                  </div>
                </div>
              </div>
            </Tab.Content>
          </div>
        </div>
        <Header
          onNote={() => onClick("chatbox")}
          onNotification={() => onClick("notification")}
          onProfile={() => onClick("profile")}
          toggle={toggle}
          title={title}
          onBox={() => onClick("box")}
          onClick={() => ClickToAddEvent()}
        />
      </Tab.Container>
    </Fragment>
  );
};

export default Deflayout;
