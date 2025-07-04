import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import useIdleLogout from "../hooks/useIdleLogout";
import { toast } from "react-hot-toast";
import useFetchAuthToken from "../hooks/useFetchAuthToken";
import secureLocalStorage from "react-secure-storage";
import { STAFF_TYPE } from "../jsx/constant/user";
import { generateErrorMessage } from "../utils/generateErrorMessage";

const authContext = createContext(undefined);

export const AUTH_LOCAL_STORAGE_KEY = "auth";

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(
    () => secureLocalStorage.getItem(AUTH_LOCAL_STORAGE_KEY) || null
  );

  const [isAuthLoading, setIsAuthLoading] = useState();
  const [refreshTokenCounter, setRefreshTokenCounter] = useState(0);

  const token = useRef("");
  const navigate = useNavigate();

  useFetchAuthToken(token, refreshTokenCounter);
  useIdleLogout(userData, signOut);

  const refreshAuthTokenNow = useCallback(() => {
    setRefreshTokenCounter((prev) => prev + 1);
  }, []);

  function signOut() {
    setUserData(null);
    secureLocalStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
    secureLocalStorage.removeItem("clientName");
    navigate("/");
  }

  const updateUserData = useCallback((data) => {
    setUserData(data);
    secureLocalStorage.setItem(AUTH_LOCAL_STORAGE_KEY, data);
  }, []);

  const authenticateUserWithEmailAndPassword = async ({ email, password }) => {
    try {
      setIsAuthLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_BACKEND_BASE_URL}/onlineauth`,
        {
          username: email,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token.current}`,
          },
        }
      );

      if (response.data.Response) {
        const userData = { id: email, type: STAFF_TYPE };
        updateUserData(userData);
        navigate("/home");
      } else {
        toast.error("Invalid credientials", { id: "crediential" });
      }
    } catch (error) {
      toast.error(generateErrorMessage(error), { id: "crediential" });
    } finally {
      setIsAuthLoading(false);
    }
  };

  return (
    <authContext.Provider
      value={{
        authenticateUserWithEmailAndPassword,
        signOut,
        userData,
        updateUserData,
        isAuthLoading,
        refreshAuthTokenNow,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
