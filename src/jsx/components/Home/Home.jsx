import { Button } from "react-bootstrap";
import CoralpayLogo from "../../../images/coralpay-logo.png";
import { useChat } from "../../../context/ChatContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDocument } from "../../../context/DocumentContext";
import { useAuth } from "../../../context/AuthContext";
import { STAFF_TYPE } from "../../constant/user";

function StartConversation() {
  const { startConversation, startConversationForDocumentation } = useChat();
  const navigate = useNavigate();

  const { documents } = useDocument();
  const { userData } = useAuth();

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
        {userData.type === STAFF_TYPE ? (
          <Button
            className="me-3 background-primary-custom "
            onClick={startNormalConversation}
          >
            Customer Support
          </Button>
        ) : null}
        <Button
          style={{
            backgroundColor: "transparent",
            borderColor: "#64154a",
            color: "#64154a",
          }}
          onClick={handleShow}
        >
          Documentation Enquiry
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Select a channel type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {documents.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "2em",
                fontSize: "0.8em",
              }}
            >
              {documents.map(({ key, value }) => (
                <Button
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    border: "0",
                    textTransform: "uppercase",
                  }}
                  key={key}
                  className="custom-button"
                  onClick={() => startDocumentaion(value)}
                >
                  {key}
                </Button>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center" }}>No Channel available</p>
          )}
        </Modal.Body>
      </Modal>
    </main>
  );
}

export default StartConversation;
