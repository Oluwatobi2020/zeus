import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { generateErrorMessage } from "@/utils/generateErrorMessage";

export function useStartTransactionConversationMutation({ onSuccess }) {
  return useMutation({
    mutationFn: async ({ userId }) => {
      const res = await axios.post(
        `${import.meta.env.VITE_ZEUS_BACKEND_BASE_URL}/conversation`,
        {
          userId,
          CoralAuth: true,
        },
        {
          headers: {
            apiKey: import.meta.env.VITE_ZESUS_API_KEY,
          },
        },
      );
      return res.data;
    },
    onError: (error) => {
      return generateErrorMessage(error);
    },
    onSuccess,
  });
}
