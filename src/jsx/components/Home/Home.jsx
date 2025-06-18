import { Button } from "react-bootstrap";
import CoralpayLogo from "../../../images/coralpay-logo.png";
import { useChat } from "../../../context/ChatContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { CHANNELS } from "../../constant/channels";

function StartConversation() {
  const { startConversation, startConversationForDocumentation } = useChat();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function startNormalConversation() {
    startConversation();
    navigate("/dashboard");
  }

  function startDocumentaion(slug) {
    startConversationForDocumentation();
    navigate(`/dashboard?type=${slug}`);
  }

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
      <h1 className="">Start a Conversation With Zeus</h1>
      <div className="mt-3">
        <Button
          className="me-3 background-primary-custom "
          onClick={startNormalConversation}
        >
          Normal Conversation
        </Button>
        <Button
          style={{
            backgroundColor: "transparent",
            borderColor: "#64154a",
            color: "#64154a",
          }}
          onClick={handleShow}
        >
          Documentation Conversation
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select a channel type</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
          {CHANNELS.map(({ name, slug }) => (
            <Button
              style={{
                display: "block",
                width: "30%",
                marginBottom: "10px",
                border: "0",
              }}
              className="custom-button"
              onClick={() => startDocumentaion(slug)}
            >
              {name}
            </Button>
          ))}
        </Modal.Body>
      </Modal>
    </main>
  );
}

export default StartConversation;
