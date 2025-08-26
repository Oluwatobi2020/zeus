import { useRef, useState } from "react";

import { useRefreshConversationTokenQuery } from "@/hooks/useRefreshConversationTokenQuery";
import { useSendZeusMessage } from "@/hooks/useSendZeusMessage";
import { useStartTransactionConversationMutation } from "@/hooks/useStartTransactionConversationMutation";

import { useAuth } from "../Auth/useAuth";
import TransactionContext from "./context";

export const TransactionProvider = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState(() => []);

  const conversationInfo = useRef({
    token: "",
    conversationId: "",
    type: "",
  });

  const supportAbortControllerRef = useRef(null);
  const updateConversationInfo = (data) => {
    const { conversationId, token, expiresIn } = data;
    conversationInfo.current = {
      token,
      conversationId,
      expireTime: expiresIn * 1000,
    };
  };

  useRefreshConversationTokenQuery({
    conversationId: conversationInfo.current.conversationId,
    token: conversationInfo.current.token,
    onSuccess: updateConversationInfo,
  });

  const startConversationMutation = useStartTransactionConversationMutation({
    onSuccess: updateConversationInfo,
  });

  const sendMessageMutation = useSendZeusMessage({
    conversationInfo: conversationInfo.current,
    userId: user.id,
    updateMessage: (msg) => setMessages((prev) => [...prev, msg]),
    abortControllerRef: supportAbortControllerRef,
  });

  const startNewConversation = () => {
    if (supportAbortControllerRef.current) {
      supportAbortControllerRef.current.abort();
    }
    startConversationMutation.mutate({
      userId: user.id,
    });
    setMessages([]);
  };

  return (
    <TransactionContext.Provider
      value={{
        messages,
        sendMessage: sendMessageMutation.mutate,
        isSendingMessage: sendMessageMutation.isPending,
        startNewConversation,
        startConversation: startConversationMutation.mutate,
        conversationId: conversationInfo.current.conversationId,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
