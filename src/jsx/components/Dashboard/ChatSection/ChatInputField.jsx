import { useState } from "react";
import { BiMicrophone } from "react-icons/bi";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

import { useChat } from "../../../../context/ChatContext";
import TextareaAutosize from "react-textarea-autosize";
import { BsSendFill } from "react-icons/bs";

const ChatInputField = ({ userChats }) => {
  const { sendMessage } = useChat();
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (message.trim() === "") return;
    sendMessage({
      text: message,
      timestamp: new Date(),
      from: { id: "user" },
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
        marginTop: "auto"
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
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div
        className="d-flex justify-content-end align-items-center p-2 gap-2"
        style={{ background: "#fff" }}
      >
        <button
          className="me-2"
          style={{ border: "none", background: "#fff" }}
          type="button"
        >
          <BiMicrophone size={20} color="#000" />
        </button>

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
