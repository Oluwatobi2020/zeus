import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { generateZeusErrorMessages } from "../utils/generateZeusErrorMessage";

export function useSendZeusMessage({
  userId,
  conversationInfo,
  updateMessage,
  abortControllerRef,
}) {
  return useMutation({
    mutationFn: async (message) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const newController = new AbortController();
      abortControllerRef.current = newController;

      updateMessage(message);

      const { token, conversationId, type } = conversationInfo;

      const res = await axios.post(
        `${import.meta.env.VITE_ZEUS_BACKEND_BASE_URL}/message`,
        {
          type: "message",
          from: { id: userId },
          text: (type ? `#${type} ` : "") + message.text,
          conversationId,
        },
        {
          headers: {
            AuthToken: token,
            apiKey: import.meta.env.VITE_ZESUS_API_KEY,
            "Content-Type": "application/json",
          },
          signal: newController.signal,
        }
      );

      return res.data;
    },
    onSuccess: (data) => {
      const activity = data.activity;
      if (!activity?.text?.trim()) {
        updateMessage({
          text:
            data.responseHeader?.responseMessage ||
            "🤔 Hmm... I didn't get a proper response. Mind trying that again?",
          timestamp: new Date(),
          from: { id: "coralpaybot" },
        });
      } else {
        updateMessage(activity);
      }
    },
    onError: (err) => {
      if (
        err.name === "CanceledError" ||
        err.name === "AbortError" ||
        axios.isCancel?.(err)
      ) {
        return;
      }

      updateMessage({
        text: generateZeusErrorMessages(err),
        timestamp: new Date(),
        from: { id: "coralpaybot" },
      });
    },
  });
}
