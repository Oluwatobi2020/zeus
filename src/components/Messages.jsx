import { useEffect, useRef } from "react";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import { useAuth } from "../context/Auth/useAuth";
import { customSchema } from "../lib/markdownSchema";
import { cn } from "../utils/cn";
import logo from "/src/assets/zeus-logo.png";

function Messages({ messages, isLoading }) {
  const { user } = useAuth();

  const lastMessageRef = useRef();

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className=" py-2 max-w-3xl mx-auto  overflow-hidden ">
      <div className="space-y-3 ">
        {messages.map((msg, idx) => {
          const isUser = msg?.from?.id === user.id;
          const isLastMessage = idx === messages.length - 1;

          return (
            <div
              className={cn("flex gap-1 items-end  mb-3", {
                "justify-start flex-row-reverse": isUser,
                "justify-start": !isUser,
              })}
              key={msg?.id || msg.timestamp}
            >
              <img
                src={isUser ? user.image : logo}
                alt={isUser ? user.username : "Zeus"}
                className="rounded-full w-5"
              />
              <div
                key={idx}
                ref={isLastMessage ? lastMessageRef : null}
                className={cn(
                  `mt-1 mb-1 px-4 py-3  text-sm break-words max-w-[75%] w-max rounded-lg`,
                  {
                    "bg-white text-gray-900  border border-gray-200 shadow dark:bg-light-dark dark:border-light-dark dark:text-white  rounded-br-none":
                      isUser,
                    "bg-[#131112a4] text-white rounded-bl-none": !isUser,
                  },
                )}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, [rehypeSanitize, customSchema]]}
                  components={{
                    code({ inline, children, ...props }) {
                      return !inline ? (
                        <pre className="overflow-x-auto whitespace-pre-wrap break-words p-2 rounded bg-white/10 text-white text-sm">
                          <code {...props}>{children}</code>
                        </pre>
                      ) : (
                        <code className="bg-black/20 px-1 py-0.5 rounded">{children}</code>
                      );
                    },
                    table: ({ ...props }) => (
                      <div className="overflow-x-auto my-2">
                        <table
                          {...props}
                          className="w-full border-collapse min-w-[600px] text-left text-sm"
                        />
                      </div>
                    ),
                    th: ({ ...props }) => (
                      <th
                        {...props}
                        className="border border-white bg-black/40 px-2 py-1 font-medium"
                      />
                    ),
                    td: ({ ...props }) => (
                      <td {...props} className="border border-gray-300 px-2 py-1" />
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>

                <div className="text-right text-xs text-gray-400 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-end gap-1">
            <img src={logo} alt={"Zeus"} className="rounded-full w-5" />
            <div className="bg-[#131112a4] text-white mr-auto  mt-1  p-2 rounded-lg rounded-bl-none text-sm break-words max-w-[75%] w-max flex items-center">
              <p>Thinking</p>
              <span className="typing-dot">.</span>
              <span className="typing-dot">.</span>
              <span className="typing-dot">.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
