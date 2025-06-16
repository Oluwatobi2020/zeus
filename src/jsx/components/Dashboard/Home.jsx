import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import CoralPayLogo from "../../../images/coralpay-logo.png";

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";

import ChatSection from "./ChatSection/ChatSection";
import ChatInputField from "./ChatSection/ChatInputField";
import { useLoader } from "../../../hooks/useLoader";
import { ChatProvider } from "../../../context/ChatContext";

import { useChat } from "../../../context/ChatContext";
import Messages from "./ChatSection/Messages";

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
  const { messages } = useChat();

  return (
    <section
      style={{
        height: "80vh",
        width: "80%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1 }}>
        {messages?.length > 0 && <Messages messages={messages} />}
      </div>

      <ChatInputField userChats={messages} />
    </section>
  );
}

export { AllSection };
export default Home;
