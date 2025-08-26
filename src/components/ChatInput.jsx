import { useState } from "react";

import { useFormik } from "formik";
import TextareaAutosize from "react-textarea-autosize";

import { useAuth } from "../context/Auth/useAuth";
import { cn } from "../utils/cn";
import MicroPhone from "./MircoPhone";
// import Microphone from "./MicroPhone";
import ArrowTop from "./icons/ArrowTop";

const ChatInputField = ({ sendMessage }) => {
  const { user } = useAuth();
  const [interimMessage, setInterimMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const trimmedMessage = values.message.trim();
      if (trimmedMessage === "") return;

      sendMessage({
        text: trimmedMessage,
        timestamp: new Date(),
        from: { id: user.id },
      });

      resetForm();
      setInterimMessage("");
    },
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formik.handleSubmit();
    }
  };

  const updateMessage = (value) => {
    formik.setValues((prev) => ({ ...prev, message: prev.message + " " + value }));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div
        className={cn(
          "bg-white rounded-xl px-4 py-3 shadow border border-gray-300 max-w-3xl mx-auto",
          "dark:bg-light-dark dark:border-light-dark",
        )}
      >
        <TextareaAutosize
          name="message"
          minRows={1}
          maxRows={7}
          placeholder="Ask anything..."
          className={cn(
            "w-full resize-none text-sm leading-tight outline-none  rounded-md",
            "dark:text-white",
          )}
          value={formik.values.message + (interimMessage ? " " + interimMessage : "")}
          onChange={formik.handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="flex justify-end items-center mt-2">
          <MicroPhone
            updateMessage={updateMessage}
            currentMessage={formik.values.message}
            setInterimMessage={setInterimMessage}
          />
          <button
            type="submit"
            className={cn(
              " bg-gray-700 text-white rounded-full transition cursor-pointer p-1",
              " dark:bg-white dark:text-light-dark",
            )}
          >
            <ArrowTop />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInputField;
