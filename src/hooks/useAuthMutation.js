import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

import { generateErrorMessage } from "../utils/generateErrorMessage";

export const useAuthMutation = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const tokenResponse = await axios.post(
        `${import.meta.env.VITE_AUTH_BACKEND_BASE_URL}/authentication`,
        {
          username: import.meta.env.VITE_AUTH_NAME,
          password: import.meta.env.VITE_AUTH_PASSWORD,
          appKey: import.meta.env.VITE_AUTH_APP_KEY,
        },
      );

      const token = tokenResponse.data.Token;

      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_BACKEND_BASE_URL}/onlineauth`,
        {
          username: email,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.data.Response) {
        throw new Error("Invalid credentials");
      }

      return {
        id: email,
        username: email.split(".")[0],
        type: "STAFF",
      };
    },
    onSuccess,
    onError: (error) => {
      const msg =
        error.message === "Invalid credentials" || !error.response.data.Response
          ? "Invalid credentials"
          : generateErrorMessage(error);
      toast.error(msg);
    },
  });
};
