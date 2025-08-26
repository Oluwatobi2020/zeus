import { useRef, useState } from "react";

import { useAccessibleDocuments } from "@/hooks/useAccessibleDocuments";
import { useRefreshConversationTokenQuery } from "@/hooks/useRefreshConversationTokenQuery";
import { useSendZeusMessage } from "@/hooks/useSendZeusMessage";
import { useStartDocumentationConversationMutation } from "@/hooks/useStartDocumentationConversationMutation";

import { useAuth } from "../Auth/useAuth";
import DocumentationContext from "./context";

export const DocumentationProvider = ({ children }) => {
  const { user } = useAuth();
  const { selectedDocument } = useAccessibleDocuments();

  const [messages, setMessages] = useState([]);

  const abortControllerRef = useRef(null);
  const conversationInfo = useRef({ token: "", conversationId: "", type: "" });

  const updateConversationInfo = (data) => {
    const { token, conversationId, expiresIn } = data;
    conversationInfo.current = {
      token,
      conversationId,
      expireTime: expiresIn * 1000,
      type: selectedDocument?.value,
    };
  };

  useRefreshConversationTokenQuery({
    conversationId: conversationInfo.current.conversationId,
    token: conversationInfo.current.token,
    onSuccess: updateConversationInfo,
  });

  const startConversationMutation = useStartDocumentationConversationMutation({
    onSuccess: updateConversationInfo,
  });

  const sendMessageMutation = useSendZeusMessage({
    conversationInfo: conversationInfo.current,
    userId: user.id,
    updateMessage: (msg) => setMessages((prev) => [...prev, msg]),
    abortControllerRef,
  });

  const startNewConversation = () => {
    abortControllerRef.current?.abort();
    setMessages([]);
  };

  return (
    <DocumentationContext.Provider
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
    </DocumentationContext.Provider>
  );
};
