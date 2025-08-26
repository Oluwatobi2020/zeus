import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { generateZeusErrorMessages } from "../utils/generateZeusErrorMessage";

export function useStartDocumentationConversationMutation({ onSuccess }) {
  return useMutation({
    mutationFn: async ({ userId, documentKey }) => {
      const res = await axios.post(
        `${import.meta.env.VITE_ZEUS_BACKEND_BASE_URL}/conversation/ZeusDocumentAssistant`,
        {
          userId,
          requestedDocumentKey: documentKey,
        },
        {
          headers: {
            apiKey: import.meta.env.VITE_ZESUS_API_KEY,
          },
        },
      );
      return res.data;
    },
    onError: (err) => {
      return {
        text: generateZeusErrorMessages(err),
        timestamp: new Date(),
        from: { id: "coralpaybot" },
      };
    },
    onSuccess,
  });
}
