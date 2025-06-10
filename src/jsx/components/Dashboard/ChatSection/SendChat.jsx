import React from "react";

const SendChat = ({ content, chatRealTime }) => {
  return (
    <div>
      <div className="d-flex justify-content-end mb-4">
        <div
          className="msg_cotainer_send"
          style={{
            padding: "1rem",
            background: "#f5f5f5",
            borderRadius: "10px",
          }}
        >
          {content}
          <span
            className="msg_time_send"
            style={{
              fontSize: "0.7em",
              fontStyle: "italic",
              color: "#E0DFDE",
              marginLeft: "0.5rem",
            }}
          >
            {`@${chatRealTime}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SendChat;
