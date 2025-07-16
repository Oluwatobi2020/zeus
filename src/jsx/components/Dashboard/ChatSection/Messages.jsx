import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef } from "react";
import { useChat } from "../../../../context/ChatContext";
import { useAuth } from "../../../../context/AuthContext";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { customSchema } from "../../../../utils/markdownSchema";

function Messages({ messages }) {
  const lastMessageRef = useRef();

  const { isLoading } = useChat();
  const { userData } = useAuth();

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className="flex-grow-1 mb-3"
      style={{ overflowY: "scroll", height: "57vh", minHeight: "57vh" }}
    >
      {messages.map((msg, idx) => {
        const isUser = msg?.from?.id === userData.id;

        const isLastMessage = idx === messages.length - 1;

        return (
          <div
            key={idx}
            ref={isLastMessage ? lastMessageRef : null}
            className={`mb-3 mt-1 px-2 py-1 rounded border markdown-body`}
            style={{
              backgroundColor: isUser ? "white" : "#f8f9fa",
              fontSize: "14px",
              wordBreak: "break-word",
              width: "max-content",
              maxWidth: "75%",
              marginLeft: isUser ? "auto" : "",
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, [rehypeSanitize, customSchema]]}
              components={{
                table: ({ node, ...props }) => (
                  <div style={{ overflowX: "auto" }}>
                    <table
                      {...props}
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        minWidth: "600px",
                      }}
                    />
                  </div>
                ),
                th: ({ node, ...props }) => {
                  const index = props["data-index"];
                  const columnWidths = ["120px", "250px", "200px"];
                  return (
                    <th
                      {...props}
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        background: "#f9f9f9",
                        minWidth: columnWidths[index] || "150px",
                      }}
                    />
                  );
                },
                td: ({ node, ...props }) => {
                  const index = props["data-index"];
                  const columnWidths = ["120px", "250px", "200px"];
                  return (
                    <td
                      {...props}
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        minWidth: columnWidths[index] || "150px",
                      }}
                    />
                  );
                },
              }}
            >
              {msg.text}
            </ReactMarkdown>

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
