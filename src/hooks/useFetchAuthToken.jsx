import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function useFetchAuthToken(token, refreshTrigger) {
  useEffect(() => {
    if (!token) return;

    const fetchAuthToken = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_AUTH_BACKEND_BASE_URL}/authentication`,
          {
            username: process.env.REACT_APP_AUTH_NAME,
            password: process.env.REACT_APP_AUTH_PASSWORD,
            appKey: process.env.REACT_APP_AUTH_APP_KEY,
          }
        );
        token.current = response.data.Token;
      } catch (err) {
        toast.error(err.message || "Failed to fetch auth token");
      }
    };

    fetchAuthToken();
    console.log("REFERE")
  }, [token, refreshTrigger]);
}

export default useFetchAuthToken;
