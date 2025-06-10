import React from "react";
import { BiMicrophone } from "react-icons/bi";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useLoader } from "../../../../hooks/useLoader";
import { BsSendFill } from "react-icons/bs";

const ChatInputField = ({
  userChat,
  setUserChat,
  handleSendChat,
  setOpenMsg,
  newMessage,
  userChats,
}) => {
  const { resetChat, startNewChat, toggleOpenNewMsg, openNewMsg } = useLoader();
  return (
    <div
      style={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        background: "#fff",
        borderRadius: "20px 20px 20px 20px",
        height: "20vh",
        width: openNewMsg ? "100%" : "70%",
        marginBottom: "-2rem",
      }}
    >
      <div style={{ background: "#fff" }}>
        <input
          name="universalSearch"
          placeholder="Ask anything..."
          value={userChat}
          onChange={(e) => setUserChat(e.target.value)}
          style={{
            padding: "1rem",
            width: "100%",
            // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            border: "none",
          }}
        />
      </div>
      <div
        className="d-flex justify-content-end align-items-center p-2"
        style={{ background: "#fff" }}
      >
        <div style={{ marginRight: "1rem" }}>
          <button
            className="me-2"
            style={{ border: "none", background: "#fff" }}
          >
            <BiMicrophone size={20} color="#000" />
          </button>
        </div>
        <div>
          <button
            className="me-2"
            style={{ border: "none", background: "#fff" }}
            onClick={() => {
              handleSendChat();
              setOpenMsg(true);
            }}
          >
            {userChats?.length > 0 ? (
              <>
                <BsSendFill size={20} color="#000" />
              </>
            ) : (
              <>
                <BsFillArrowUpCircleFill size={30} color="#000" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInputField;
