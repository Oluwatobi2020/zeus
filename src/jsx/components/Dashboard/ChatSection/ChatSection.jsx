import ReplyChat from "./ReplyChat";
import SendChat from "./SendChat";

const ChatSection = ({
  avatar1,
  avatar2,
  openMsg,
  offMsg,
  messages,
  userInput,
  handleSend,
  setUserInput,
}) => {
  return (
    <div className={`card chat dz-chat-history-box ${openMsg ? "" : "d-none"}`}>
      <div
        className="card-body msg_card_body dz-scroll"
        id="DZ_W_Contacts_Body3"
      >
        {messages?.map((msg, index) =>
          msg?.from?.id === "" ? (
            <SendChat
              key={index}
              content={msg.text}
              chatRealTime={msg.timestamp}
            />
          ) : (
            <ReplyChat
              key={index}
              content={msg.text}
              chatRealTime={msg.timestamp}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ChatSection;
