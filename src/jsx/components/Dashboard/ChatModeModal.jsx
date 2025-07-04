import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useChat } from "../../../context/ChatContext";
import { useAuth } from "../../../context/AuthContext";
import { useConversationType } from "../../../hooks/useConversationType";

function ChatModeModal() {
  const { sendMessage, messages } = useChat();
  const { userData } = useAuth();
  const conversationType = useConversationType();

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (conversationType && messages.length === 1) {
      setShow(true);
    }
  }, [conversationType, messages.length]);

  const handleSend = async (message) => {
    setShow(false);
    sendMessage({
      text: message,
      timestamp: new Date(),
      from: { id: userData.id },
    });
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Select a chat mode</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p className="mb-1">
            👋 Welcome to the Zeus API Document Assistant! I'm here to help you
            with payment API integration using our official documentation.
            Please choose how you'd like to proceed:
          </p>
          <p className="mb-1">
            1️⃣ Guided Mode – I’ll walk you through the integration steps, one at
            a time.
          </p>
          <p>
            2️⃣ Unguided Mode – Ask me anything directly about the documents.
          </p>
          <p>Here’s how to switch modes at any time:</p>
          <p className="mb-1">
            - Type <strong>switch to guided</strong> to follow a structured
            integration flow.
          </p>
          <p>
            - Type <strong>switch to unguided</strong> to ask your own questions
            freely. Let’s build something great together!
          </p>
        </div>
        <div style={{ display: "flex", gap: "2em", justifyContent: "center" }}>
          <Button className="custom-button" onClick={() => handleSend("1")}>
            Guided
          </Button>
          <Button className="custom-button" onClick={() => handleSend("2")}>
            Unguided
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ChatModeModal;
