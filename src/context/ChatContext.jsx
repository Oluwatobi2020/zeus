import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { generateErrorMessages } from "../utils/generateZeusErrorMessage";
import { LIST_OF_MESSAGES } from "../jsx/constant/introMessages";
import { useAuth } from "./AuthContext";
import { useDocument } from "./DocumentContext";
import useStartConversation from "../hooks/useStartConversation";
import { useConversationType } from "../hooks/useConversationType";

const chatContext = createContext(undefined);

const randomMessageIndex = Math.floor(Math.random() * LIST_OF_MESSAGES.length);

export const ChatProvider = ({ children }) => {
  const { userData } = useAuth();
  const conversationType = useConversationType();
  const abortControllerRef = useRef(null);

  const { documents } = useDocument();

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const tokenInformation = useRef({
    token: "",
    conversationId: "",
    expireTime: 3600,
  });

  const selectedChannel = useMemo(
    () => documents?.find((channel) => channel.value === conversationType),
    [conversationType, documents]
  );

  const startConversationForDocumentation = useCallback(
    async function startConversationForDocumentation() {
      if (!userData) return;

      try {
        setMessages([
          {
            text: `Welcome to Zeus API Document Assistant for ${selectedChannel?.key.toUpperCase()}!`,
            timestamp: new Date(),
            from: { id: "coralpaybot" },
          },
        ]);
        const res = await axios.post(
          `${process.env.REACT_APP_ZEUS_BACKEND_BASE_URL}/conversation/ZeusDocumentAssistant`,
          {
            userId: userData.id,
            requestedDocumentKey: conversationType,
          },
          {
            headers: {
              apiKey: process.env.REACT_APP_ZESUS_API_KEY,
            },
          }
        );

        const { token, conversationId, expiresIn } = res.data;

        tokenInformation.current = {
          token,
          conversationId,
          expireTime: expiresIn * 1000,
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
    [conversationType, selectedChannel?.key, userData]
  );

  const startConversation = useCallback(
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
          `${process.env.REACT_APP_ZEUS_BACKEND_BASE_URL}/conversation`,
          {
            userId: userData.id,
            CoralAuth: true,
          },
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
    [userData.id]
  );

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ZEUS_BACKEND_BASE_URL}/refreshToken`,
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
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const newController = new AbortController();
    abortControllerRef.current = newController;
    try {
      setMessages((prev) => [...prev, message]);
      setIsLoading(true);

      const res = await axios.post(
        `${process.env.REACT_APP_ZEUS_BACKEND_BASE_URL}/message`,
        {
          type: "message",
          from: { id: userData.id },
          text:
            (selectedChannel ? `#${selectedChannel.value} ` : "") +
            message.text,
          conversationId: tokenInformation.current.conversationId,
        },
        {
          headers: {
            AuthToken: `${tokenInformation.current.token}`,
            apiKey: process.env.REACT_APP_ZESUS_API_KEY,
            "Content-Type": "application/json",
          },
          signal: newController.signal,
        }
      );

      const activity = res.data.activity;

      if (
        !activity ||
        !activity.text ||
        (typeof activity.text === "string" && activity.text.trim() === "")
      ) {
        setMessages((prev) => [
          ...prev,
          {
            text:
              res.data.responseHeader.responseMessage ||
              "🤔 Hmm... I didn't get a proper response. Mind trying that again?",
            timestamp: new Date(),
            from: { id: "coralpaybot" },
          },
        ]);
      } else {
        setMessages((prev) => [...prev, activity]);
      }
    } catch (err) {
      if (
        err.name === "CanceledError" ||
        err.name === "AbortError" ||
        axios.isCancel?.(err)
      ) {
        return;
      }
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

  useEffect(() => {
    if (!userData) return;

    const intervalID = setInterval(refreshToken, 3500 * 1000);
    return () => clearInterval(intervalID);
  }, [userData]);

  const resetChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    tokenInformation.current = {
      token: "",
      conversationId: "",
      expireTime: 3600,
    };
    setIsLoading(false);
    setMessages([]);
  };

  useStartConversation({
    selectedChannel,
    startConversation,
    startConversationForDocumentation,
    conversationType,
    resetChat,
  });

  return (
    <chatContext.Provider
      value={{
        messages,
        sendMessage,
        isLoading,
        startConversation,
        startConversationForDocumentation,
        selectedChannel,
        conversationId: tokenInformation.current.conversationId,
        resetChat,
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
