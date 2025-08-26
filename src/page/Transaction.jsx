import { useEffect } from "react";

import Chat from "@/components/Chat";
import ChatInputField from "@/components/ChatInput";
import Header from "@/components/Header";
import { LIST_OF_MESSAGES } from "@/data/introMessages";

import { useAuth } from "../context/Auth/useAuth";
import { useTransaction } from "../context/Transaction/useTransaction";

const randomMessageIndex = Math.floor(Math.random() * LIST_OF_MESSAGES.length);

function Transaction() {
  const { messages, sendMessage, isSendingMessage, startConversation, startNewConversation } =
    useTransaction();

  const { user } = useAuth();

  useEffect(() => {
    startConversation({ userId: user.id });
  }, [startConversation, user.id]);

  return (
    <div className="w-full dark:bg-dark">
      <Header startNewConversation={startNewConversation} />
      <Chat
        messages={messages}
        supportIntroMessage={LIST_OF_MESSAGES[randomMessageIndex]}
        isLoading={isSendingMessage}
      >
        <ChatInputField sendMessage={sendMessage} />
      </Chat>
    </div>
  );
}

export default Transaction;
