import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const getDocumentAccess = async (userId) => {
  const response = await axios.post(
    `${import.meta.env.VITE_ZEUS_BACKEND_BASE_URL}/documentAccess`,
    {
      userId: userId,
    },
  );

  const responseCode = response.data.responseHeader.responseCode;

  if (responseCode === "00") {
    return {
      documents: response.data.accessList,
      username: response.data.username,
    };
  } else {
    throw new Error(response.data.responseHeader.responseMessage);
  }
};

export const useDocumentAccessQuery = (userId) => {
  return useQuery({
    queryKey: ["documentAccess", userId],
    queryFn: () => getDocumentAccess(userId),
    enabled: !!userId,
    onError: (error) => {
      toast.error(error.message || "Failed to load documents");
    },
  });
};

export const useDocumentAccessMutation = ({ onSuccess }) => {
  return useMutation({
    queryKey: ["documentAccess"],
    mutationFn: (userId) => getDocumentAccess(userId),
    onSuccess,
    onError: (error) => {
      toast.error(error.message || "Failed to load documents");
    },
  });
};
