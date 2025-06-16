import axios from "axios";
import { createContext, useContext, useState, useEffect, useRef } from "react";

const chatContext = createContext(undefined);

export const botID = "coralpaybot";

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      text: "Welcome!, I'm Zeus, I'm here to help you check the status of your transaction. To get started, please provide your transaction ID and the payment channel",
      timestamp: new Date(),
      from: { id: botID },
    },
  ]);

  const [isLoading, setIsLoading] = useState();

  const tokenInformation = useRef({
    token: "",
    conversationId: "",
    expireTime: 3600,
  });

  useEffect(() => {
    startMessage();
    const intervalID = setInterval(refreshToken, 3500 * 1000);
    return () => clearInterval(intervalID);
  }, []);

  const startMessage = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/conversation`,
        {},
        {
          headers: {
            apiKey: process.env.REACT_APP_ZESUS_API_KEY,
          },
        }
      );
      const { token, conversationId, expires_in } = res.data;

      tokenInformation.current = {
        token,
        conversationId,
        expireTime: expires_in * 1000,
      };
    } catch (err) {
      console.log("Send Message Here => ", err);
    }
  };

  console.log(process.env.REACT_APP_BACKEND_BASE_URL)

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/refreshToken`,
        {
          conversationId: tokenInformation.current.conversationId,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenInformation.current.token}`,
            apiKey: process.env.REACT_APP_ZESUS_API_KEY,
          },
        }
      );

      const { token, conversationId, expires_in } = res.data;

      tokenInformation.current = {
        token,
        conversationId,
        expireTime: expires_in * 1000,
      };
    } catch (err) {
      console.log("Refresh Error Here => ", err);
    }
  };

  const sendMessage = async (message) => {
    try {
      setMessages((prev) => [...prev, message]);
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/message`,
        {
          type: "message",
          from: { id: "user1" },
          text: message.text,
          conversationId: tokenInformation.current.conversationId,
        },
        {
          headers: {
            AuthToken: `${tokenInformation.current.token}`,
            apiKey: process.env.REACT_APP_ZESUS_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      setMessages((prev) => [...prev, res.data.activity]);
    } catch (err) {
      console.log("Refresh Error Here => ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <chatContext.Provider value={{ messages, sendMessage, isLoading }}>
      {children}
    </chatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(chatContext);
  if (context === undefined) {
    throw new Error("usechat must be used within a chatProvider");
  }
  return context;
};

// const fetchToken = async () => {
//   try {
//     const res = await axios.post(
//       "https://directline.botframework.com/v3/directline/conversations",
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     const { token, conversationId, expires_in } = res.data;

//     tokenInformation.current = {
//       token,
//       conversationId,
//       expireTime: expires_in * 1000,
//     };
//   } catch (err) {
//     console.log("FETCHING ERROR HERE => ", err);
//   }
// };

// const getMessage = async () => {
//   try {
//     const res = await axios.get(
//       `https://directline.botframework.com/v3/directline/conversations/${tokenInformation.current.conversationId}/activities`,
//       {
//         headers: {
//           Authorization: `Bearer ${tokenInformation.current.token}`,
//         },
//       }
//     );

//     console.log(res.data.activities);
//     setMessages(res.data.activities);
//   } catch (err) {
//     console.log("THIS IS GET MESSAGE ERROR => ", err);
//   }
// };
