import React from "react";

const ReplyChat = ({ content, chatRealTime }) => {
  return (
    <div>
      <div className="d-flex justify-content-start mb-4">
        <div className="msg_cotainer">
          {content}
          <span
            className="msg_time"
            style={{
              fontSize: "0.7em",
              fontStyle: "italic",
              color: "#E0DFDE",
              marginLeft: "0.5rem",
              whiteSpace: "pre-line",
            }}
          >
            {`@${chatRealTime}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReplyChat;
