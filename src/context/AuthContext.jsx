import axios from "axios";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const authContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const token = useRef("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://204.8.207.123/coralauth/api/authentication",
          {
            username: "admin",
            password: "Welcome123@",
            appKey: "kelvinApp",
          }
        );

        token.current = response.data.activity;
      } catch (err) {
        console.error(" error:", err.message);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const authenticateUser = async (email, password) => {
    console.log(email, password);

    try {
      const response = await axios.post(
        "https://204.8.207.123/coralauth/api/onlineauth",
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

      navigate("/dashboard");
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  return (
    <authContext.Provider
      value={{
        authenticateUser,
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
