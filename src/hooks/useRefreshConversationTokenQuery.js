import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useRefreshConversationTokenQuery({ conversationId, token, onSuccess, onError }) {
  const [shouldRun, setShouldRun] = useState(false);

  const interval = 3500 * 1000;

  useEffect(() => {
    if (!token || !conversationId) return;

    const timer = setTimeout(() => {
      setShouldRun(true);
    }, interval);

    return () => clearTimeout(timer);
  }, [token, conversationId, interval]);

  return useQuery({
    queryKey: ["refreshToken", conversationId],
    queryFn: async () => {
      const res = await axios.post(
        `${import.meta.env.VITE_ZEUS_BACKEND_BASE_URL}/refreshToken`,
        {
          conversationId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: import.meta.env.VITE_ZESUS_API_KEY,
          },
        },
      );
      return res.data;
    },
    enabled: shouldRun,
    refetchInterval: interval,
    onSuccess,
    onError: (err) => {
      //   setMessages((prev) => [
      //     ...prev,
      //     {
      //       text: generateErrorMessages(err),
      //       timestamp: new Date(),
      //       from: { id: "coralpaybot" },
      //     },
      //   ]);
    },
  });
}
