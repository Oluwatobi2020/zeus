import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useAuthTokenQuery = (refreshTrigger) => {
  return useQuery({
    queryKey: ["authToken", refreshTrigger],
    queryFn: async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_BACKEND_BASE_URL}/authentication`,
        {
          username: import.meta.env.VITE_AUTH_NAME,
          password: import.meta.env.VITE_AUTH_PASSWORD,
          appKey: import.meta.env.VITE_AUTH_APP_KEY,
        }
      );

      return response.data.Token;
    },
    staleTime: 1000 * 60 * 4, // token valid for 4 minutes?
    cacheTime: 1000 * 60 * 10,
    onError: (error) => {
      toast.error(error.message || "Failed to fetch auth token");
    },
  });
};
