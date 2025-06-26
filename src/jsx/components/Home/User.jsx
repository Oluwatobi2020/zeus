import CoralpayLogo from "../../../images/coralpay-logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserIcon from "../Icons/IconSvg/User";
import BriefCaseIcon from "../Icons/IconSvg/Briefcase";
import IconWithText from "./IconWithText";
import ClientAuthModal from "./ClientAuthModal";

function User() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <main
      className="d-flex justify-content-center align-items-center "
      style={{ minHeight: "100vh", flexDirection: "column" }}
    >
      <div className="d-flex align-items-center">
        <img src={CoralpayLogo} width={80} alt="coralpay-logo" />

        <p style={{ fontSize: "2rem", color: "#64154a", marginTop: "10px" }}>
          ZEUS
        </p>
      </div>

      <h1 style={{ fontSize: "1.5rem" }}>Please select your role to proceed</h1>
      <div className="mt-3 d-flex">
        <IconWithText text="Staff" onClick={() => navigate("login")}>
          <BriefCaseIcon />
        </IconWithText>
        <IconWithText text="Client" onClick={handleShow}>
          <UserIcon />
        </IconWithText>
      </div>

      <ClientAuthModal onClose={handleClose} show={show} />
    </main>
  );
}

export default User;
