import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useSearchParams } from "react-router-dom";
import { CHANNELS } from "../jsx/constant/channels";

const chatContext = createContext(undefined);

export const userID = "user";

const LIST_OF_MESSAGES = [
  "Hey there! I’m Zeus ⚡️—your friendly transaction tracker. Let’s check that payment. Just send me your transaction ID and payment channel.",
  "Welcome aboard! Zeus here. To get started, please drop your transaction ID and channel. I promise I won’t bite… unless you’re a packet. 🧾",
  "Ah, a new traveler in the land of transactions! I'm Zeus. Give me a transaction ID and a payment channel, and I’ll do the digging.",
  "Hello! I’m Zeus—here to check the status of your transaction, without the stress. All I need is your transaction ID and channel.",
  "Greetings, mortal! Just kidding 😄. I’m Zeus. Toss me your transaction ID and payment channel, and I’ll check things faster than a lightning bolt ⚡.",
];

const randomMessageIndex = Math.floor(Math.random() * LIST_OF_MESSAGES.length);

export const ChatProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const conversationType = searchParams.get("type");

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const tokenInformation = useRef({
    token: "",
    conversationId: "",
    expireTime: 3600,
  });

  const selectedConversation = CHANNELS?.find(
    (channel) => channel.slug === conversationType
  );

  const startConversationForDocumentation = useCallback(
    async function startConversationForDocumentation() {
      try {
        setMessages([
          {
            text: `Welcome to Zeus API Document Assistant for ${selectedConversation?.name.toUpperCase()}!`,
            timestamp: new Date(),
            from: { id: "coralpaybot" },
          },
        ]);
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/conversation/ZeusDocumentAssistant`,
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
        setMessages((prev) => [
          ...prev,
          {
            text: generateErrorMessages(err),
            timestamp: new Date(),
            from: { id: "coralpaybot" },
          },
        ]);
      }
    },
    [selectedConversation?.name]
  );

  useEffect(() => {
    if (selectedConversation) {
      console.log(selectedConversation.name)
      startConversationForDocumentation();
    } else {
      startConversation();
    }

    const intervalID = setInterval(refreshToken, 3500 * 1000);
    return () => clearInterval(intervalID);
  }, [selectedConversation, startConversationForDocumentation]);

  async function startConversation() {
    try {
      setMessages([
        {
          text: LIST_OF_MESSAGES[randomMessageIndex],
          timestamp: new Date(),
          from: { id: "coralpaybot" },
        },
      ]);
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
      setMessages((prev) => [
        ...prev,
        {
          text: generateErrorMessages(err),
          timestamp: new Date(),
          from: { id: "coralpaybot" },
        },
      ]);
    }
  }

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
      setMessages((prev) => [
        ...prev,
        {
          text: generateErrorMessages(err),
          timestamp: new Date(),
          from: { id: "coralpaybot" },
        },
      ]);
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
          from: { id: userID },
          text:
            (selectedConversation ? `#${selectedConversation.slug}` : "") +
            message.text,
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
      setMessages((prev) => [
        ...prev,
        {
          text: generateErrorMessages(err),
          timestamp: new Date(),
          from: { id: "coralpaybot" },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <chatContext.Provider
      value={{
        messages,
        sendMessage,
        isLoading,
        startConversation,
        startConversationForDocumentation,
      }}
    >
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

function generateErrorMessages(err) {
  let errorMessage =
    "Hmm... something unexpected just happened 🤔. Could you please prompt me again? Thank you! – Zeus";

  if (axios.isAxiosError(err)) {
    if (err.response) {
      const status = err.response.status;

      if (status === 401) {
        errorMessage =
          "Oops! You're not authorized to do that. Please log in and try again.";
      } else if (status === 403) {
        errorMessage = "Looks like you don’t have permission for this action.";
      } else if (status === 404) {
        errorMessage =
          "Hmm... I couldn’t find that conversation. 🧐 Want to try again?";
      } else if (status >= 500) {
        errorMessage =
          "Uh-oh! Something's up on our side. Let’s try again shortly. ⚙️";
      } else if (err.response.data?.message) {
        errorMessage = err.response.data.message + " – Zeus";
      }
    } else if (err.request) {
      errorMessage =
        "I'm having trouble reaching the server 🌐. Please check your connection and try again.";
    }
  }

  return errorMessage;
}

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
