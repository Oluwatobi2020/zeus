import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";
import { userID, useChat } from "../../../../context/ChatContext";

function Messages({ messages }) {
  const scrollContainerRef = useRef();

  const { isLoading } = useChat();

  useEffect(() => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="flex-grow-1 mb-3"
      style={{ overflowY: "scroll", height: "57vh", minHeight: "57vh" }}
      ref={scrollContainerRef}
    >
      {messages.map((msg, idx) => {
        const isUser = msg?.from?.id === userID;

        return (
          <div
            key={idx}
            className={`mb-3 mt-1 px-2 py-1 rounded border`}
            style={{
              backgroundColor: isUser ? "white" : "#f8f9fa",
              fontSize: "14px",
              wordBreak: "break-word",
              width: "max-content",
              maxWidth: "75%",
              marginLeft: isUser ? "auto" : "",
            }}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>

            <small className=" d-block text-end" style={{ fontSize: "11px" }}>
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        );
      })}

      {isLoading && (
        <div
          style={{
            backgroundColor: "#f8f9fa",
            width: "fit-content",
            maxWidth: "75%",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "14px",
            color: "#555",
          }}
        >
          <span className="typing-dot">.</span>
          <span className="typing-dot">.</span>
          <span className="typing-dot">.</span>
        </div>
      )}
    </div>
  );
}

export default Messages;
