import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

import { Sparklines, SparklinesLine } from "react-sparklines";
import { BiMicrophone } from "react-icons/bi";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import CoralPayLogo from "../../../images/coralpay-logo.png";

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import PaymentTable from "./Elements/PaymentTable";
import TopProducts from "./Elements/TopProducts";
import ActivityTab from "./Elements/ActivityTab";
import UserActivity from "./Elements/UserActivity";
import ChatSection from "./ChatSection/ChatSection";
import ChatInputField from "./ChatSection/ChatInputField";
import { useLoader } from "../../../hooks/useLoader";

const AreaChart2Canvas = loadable(() =>
  pMinDelay(import("./Elements/AreaChart2Canvas"), 1000)
);
const ChartWidget2 = loadable(() =>
  pMinDelay(import("./Elements/ChartWidget2"), 1000)
);
const ShareProfitCanvas2 = loadable(() =>
  pMinDelay(import("./Elements/ShareProfitCanvas2"), 1000)
);
const ActiveUserCanvas = loadable(() =>
  pMinDelay(import("./Elements/ActiveUserCanvas"), 1000)
);

const sampleData = [6, 2, 8, 4, 3, 8, 4, 3, 6, 5, 9, 2];

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
  const [openMsg, setOpenMsg] = useState(false);
  const [messages, setMessages] = useState([]);
  const { resetChat, startNewChat, toggleOpenNewMsg, openNewMsg } = useLoader();
  const [userInput, setUserInput] = useState("");
  const handleSend = () => {
    const now = new Date().toLocaleTimeString();

    const userMsg = {
      type: "send",
      content: userInput,
      chatTime: now,
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setTimeout(() => {
      const reply = {
        type: "reply",
        content: `Zeus response: "${userInput}"`,
        chatTime: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  useEffect(() => {
    if (!openNewMsg) {
      setMessages([]);
      setUserInput("");
    }
  }, [openNewMsg]);

  return (
    <div className="row">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "100%" }}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ width: "80%", height: "60vh" }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ flexDirection: "column" }}
          >
            <p className="text-align-center" style={{ fontSize: "1.5em" }}>
              How can I help you today?
            </p>
          </div>
          {messages?.length > 0 && (
            <div style={{ height: "60vh", width: "100%" }}>
              <ChatSection
                avatar1={avatar1}
                avatar2={avatar2}
                openMsg={startNewChat}
                offMsg={() => toggleOpenNewMsg()}
                messages={messages}
                userInput={userInput}
                handleSend={handleSend}
                setUserInput={setUserInput}
              />
            </div>
          )}
          <ChatInputField
            userChat={userInput}
            setUserChat={setUserInput}
            handleSendChat={handleSend}
            setOpenMsg={startNewChat}
            newMessage={openNewMsg}
            userChats={messages}
          />
        </div>
      </div>
    </div>
  );
}

export { AllSection };
export default Home;
