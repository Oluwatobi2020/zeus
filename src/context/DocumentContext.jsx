import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { toast } from "react-hot-toast";

import { useAuth } from "./AuthContext";

const documentContext = createContext(undefined);

export const DocumentProvider = ({ children }) => {
  const { userData } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);

  const getDocumentAccess = useCallback(async function getDocumentAccess(
    accessKey
  ) {
    try {
      setIsDocumentLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_ZEUS_BACKEND_BASE_URL}/documentAccess`,
        {
          userId: accessKey,
        }
      );

      const responseCode = response.data.responseHeader.responseCode;

      if (responseCode === "00") {
        setDocuments(response.data.accessList);
        return true;
      } else {
        toast.error(response.data.responseHeader.responseMessage);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDocumentLoading(false);
    }
  },
  []);

  useEffect(() => {
    if (userData) {
      getDocumentAccess(userData.id);
    }
  }, [getDocumentAccess, userData]);

  return (
    <documentContext.Provider
      value={{ getDocumentAccess, documents, isDocumentLoading }}
    >
      {children}
    </documentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(documentContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
