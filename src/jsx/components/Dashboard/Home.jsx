import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";

import ChatInputField from "./ChatSection/ChatInputField";

import { useChat } from "../../../context/ChatContext";
import { useAuth } from "../../../context/AuthContext";
import Messages from "./ChatSection/Messages";
import { useDocument } from "../../../context/DocumentContext";
import ChatModeModal from "./ChatModeModal";

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
  const { documents } = useDocument();
  const [searchParams] = useSearchParams();
  const conversationType = searchParams.get("type");

  const selectedConversation = documents?.find(
    (channel) => channel.value === conversationType
  );

  return (
    <section
      style={{
        width: "80%",
        margin: "0 auto",
        height: "75vh",
        position: "relative",
      }}
    >
      <ChatModeModal />

      <div style={{ flex: 1 }}>
        {messages?.length > 0 && <Messages messages={messages} />}
      </div>

      <ChatInputField userChats={messages} />
    </section>
  );
}

export { AllSection };
export default Home;
