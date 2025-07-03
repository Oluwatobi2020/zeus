import { useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useChat } from "../../../../context/ChatContext";
import TextareaAutosize from "react-textarea-autosize";
import { BsSendFill } from "react-icons/bs";
import { useAuth } from "../../../../context/AuthContext";
import MicroPhone from "./MicroPhone";

const ChatInputField = ({ userChats }) => {
  const { userData } = useAuth();
  const { sendMessage } = useChat();
  const [message, setMessage] = useState("");
  const [interimMessage, setInterimMessage] = useState(""); 

  const handleSend = async () => {
    if (message.trim() === "") return;
    sendMessage({
      text: message,
      timestamp: new Date(),
      from: { id: userData.id },
    });
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <form
      style={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        background: "#fff",
        borderRadius: "20px 20px 20px 20px",
        width: "100%",
        padding: "10px",
        marginTop: "auto",
        marginBottom: "20px",
        position: "absolute",
        bottom: "10px",
      }}
    >
      <TextareaAutosize
        name="universalSearch"
        minRows={1}
        maxRows={4}
        placeholder="Ask anything..."
        className="form-control"
        style={{
          resize: "none",
          backgroundColor: "white",
          borderRadius: "0.375rem",
          fontSize: "14px",
          lineHeight: 1.4,
          boxShadow: "none",
          border: "none",
        }}
        value={message + interimMessage}
        onChange={(e) => {
          setMessage(e.target.value);
          setInterimMessage("");
        }}
        onKeyDown={handleKeyDown}
      />
      <div
        className="d-flex justify-content-end align-items-center p-2 gap-2"
        style={{ background: "#fff" }}
      >
        <MicroPhone
          setMessage={setMessage}
          setInterimMessage={setInterimMessage}
        />

        <button
          className="me-2"
          style={{ border: "none", background: "#fff" }}
          type="button"
          onClick={handleSend}
        >
          {userChats?.length > 0 ? (
            <BsSendFill size={20} color="#000" />
          ) : (
            <BsFillArrowUpCircleFill size={30} color="#000" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatInputField;
