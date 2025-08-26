import Footer from "./Footer";
import Messages from "./Messages";

function Chat({ messages, children, isLoading, supportIntroMessage }) {
  const hasMessages = messages.length > 0;

  return (
    <main className=" w-full px-4">
      <div className="w-full flex flex-col flex-1 h-[92.7vh] md:h-[90vh]">
        {hasMessages ? (
          <>
            <div className="flex-1 overflow-y-auto h-[75vh]">
              <Messages messages={messages} isLoading={isLoading} />
            </div>

            {children}
            <Footer />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-3xl space-y-6">
              <div className="text-center">
                <h1 className=" font-bold text-4xl text-gray-400 dark:text-white">ZEUS</h1>
                {supportIntroMessage ? (
                  <p className="text-xs md:text-sm text-black/70 dark:text-white/80">
                    {supportIntroMessage}
                  </p>
                ) : null}
              </div>
              {children}
              <Footer />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Chat;
