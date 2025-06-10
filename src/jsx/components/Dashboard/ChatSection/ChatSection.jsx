import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReplyChat from "./ReplyChat";
import SendChat from "./SendChat";
import ChatInputField from "./ChatInputField";

const ChatSection = ({
  avatar1,
  avatar2,
  openMsg,
  offMsg,
  messages,
  userInput,
  handleSend,
  setUserInput,
}) => {
  
  console.log("messages", messages)
  return (
    <div className={`card chat dz-chat-history-box ${openMsg ? "" : "d-none"}`}>
      <div
        className="card-body msg_card_body dz-scroll"
        id="DZ_W_Contacts_Body3"
      >
        {messages?.map((msg, index) =>
          msg.type === "send" ? (
            <SendChat
              key={index}
              content={msg.content}
              chatRealTime={msg.chatTime}
            />
          ) : (
            <ReplyChat
              key={index}
              content={msg.content}
              chatRealTime={msg.chatTime}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ChatSection;
