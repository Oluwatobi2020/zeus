import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";

import ChatInputField from "./ChatSection/ChatInputField";

import { useChat } from "../../../context/ChatContext";
import { useAuth } from "../../../context/AuthContext";
import Messages from "./ChatSection/Messages";
import { Modal, Button } from "react-bootstrap";
import { useDocument } from "../../../context/DocumentContext";

const Home = () => {
  const {
    changeBackground,
    changeSideBarStyle,
    chnageSidebarColor,
    changeNavigationHader,
  } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
    changeSideBarStyle({ value: "mini", label: "Mini" });
    chnageSidebarColor("color_3");
    changeNavigationHader("color_3");
  }, []);
  return (
    <>
      <AllSection />
    </>
  );
};

function AllSection() {
  const { messages, sendMessage } = useChat();
  const { userData } = useAuth();
  const { documents } = useDocument();
  const [searchParams] = useSearchParams();
  const conversationType = searchParams.get("type");

  const selectedConversation = documents?.find(
    (channel) => channel.value === conversationType
  );

  const handleSend = async (message) => {
    setShow(false);
    sendMessage({
      text: message,
      timestamp: new Date(),
      from: { id: userData.id },
    });
  };

  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <section
      style={{
        width: "80%",
        margin: "0 auto",
        height: "75vh",
        position: "relative",
      }}
    >
      {selectedConversation && (
        <p
          style={{
            position: "absolute",
            right: "-6em",
            background: "#64154a",
          }}
          className="p-2 rounded text-white"
        >
          {selectedConversation.key}
        </p>
      )}

      <div style={{ flex: 1 }}>
        {messages?.length > 0 && <Messages messages={messages} />}
      </div>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Select a chat mode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className="mb-1">
              👋 Welcome to the Zeus API Document Assistant! I'm here to help
              you with payment API integration using our official documentation.
              Please choose how you'd like to proceed:
            </p>
            <p className="mb-1">
              1️⃣ Guided Mode – I’ll walk you through the integration steps, one
              at a time.
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
              - Type <strong>switch to unguided</strong> to ask your own
              questions freely. Let’s build something great together!
            </p>
          </div>
          <div
            style={{ display: "flex", gap: "2em", justifyContent: "center" }}
          >
            <Button
              style={{
                display: "block",
                marginBottom: "10px",
                border: "0",
              }}
              className="custom-button"
              onClick={() => handleSend("1")}
            >
              Guided
            </Button>
            <Button
              style={{
                display: "block",
                marginBottom: "10px",
                border: "0",
              }}
              className="custom-button"
              onClick={() => handleSend("2")}
            >
              Unguided
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <ChatInputField userChats={messages} />
    </section>
  );
}

export { AllSection };
export default Home;
