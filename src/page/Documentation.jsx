import { useEffect } from "react";

import Chat from "../components/Chat";
import ChatInputField from "../components/ChatInput";
import Header from "../components/Header";
import { useAuth } from "../context/Auth/useAuth";
import { useDocumentation } from "../context/Documentation/useDocumentation";
import { useAccessibleDocuments } from "../hooks/useAccessibleDocuments";
import { useDocumentationReroute } from "../hooks/useDocumentationReroute";

function Documentation() {
  const { messages, sendMessage, isSendingMessage, startConversation, startNewConversation } =
    useDocumentation();

  const { user } = useAuth();

  const { firstDocKey, urlDoc, selectedDocument, accessibleDocs } = useAccessibleDocuments();

  useEffect(() => {
    startConversation({ userId: user.id, documentKey: selectedDocument?.value });
  }, [selectedDocument?.value, startConversation, user.id]);

  useDocumentationReroute({ urlDoc, firstDocKey });

  return (
    <div className="w-full">
      <Header
        selectedDocument={selectedDocument?.key}
        accessibleDocuments={accessibleDocs}
        startNewConversation={startNewConversation}
      />
      <Chat messages={messages} isLoading={isSendingMessage}>
        <ChatInputField sendMessage={sendMessage} />
      </Chat>
    </div>
  );
}

export default Documentation;
