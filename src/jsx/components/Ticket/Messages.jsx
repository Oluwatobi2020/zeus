function Messages({ messages }) {
  return (
    <div className="flex-grow-1  p-3 mb-3" style={{ overflowY: "auto" }}>
      {messages.length === 0 ? (
        <p>Start the conversation...</p>
      ) : (
        messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 d-flex flex-column ${
              msg.sender === "You"
                ? "align-self-start"
                : "align-self-end text-end"
            }`}
          >
            <div className="d-flex justify-content-between align-items-center w-100">
              <strong style={{ color: "#64154A", fontSize: "14px" }}>
                {msg.sender}
              </strong>
            </div>

            <div
              className="mt-1 px-2 py-1 rounded border d-inline-block"
              style={{
                backgroundColor: "#f8f9fa",
                maxWidth: "75%",
                fontSize: "14px",
                width: "max-content",
                wordBreak: "break-word",
              }}
            >
              <p className="mb-1">{msg.text}</p>

              <small className=" d-block text-end" style={{ fontSize: "11px" }}>
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Messages;
