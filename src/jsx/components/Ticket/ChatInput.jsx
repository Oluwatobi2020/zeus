import { useFormik } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import { useTicket } from "../../../context/TicketContext";

function ChatInput({ ticketId }) {
  const { addChatMessage } = useTicket();

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: (values, { resetForm }) => {
      if (!values.message.trim()) return;

      addChatMessage(ticketId, {
        sender: "You",
        text: values.message.trim(),
        timestamp: new Date().toISOString(),
      });
      resetForm();
    },
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formik.handleSubmit();
    }
  };

  return (
    <form
      className="d-flex align-items-end px-2 gap-1"
      onSubmit={formik.handleSubmit}
    >
      <TextareaAutosize
        name="message"
        minRows={1}
        maxRows={4}
        placeholder="Type a message..."
        className="form-control"
        style={{
          resize: "none",
          backgroundColor: "white",
          padding: "7px 3px",
          borderRadius: "0.375rem",
          fontSize: "14px",
          lineHeight: 1.4,
          boxShadow: "none",
        }}
        value={formik.values.message}
        onChange={formik.handleChange}
        onKeyDown={handleKeyDown}
      />

      <button
        className="btn background-primary-custom text-white"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
