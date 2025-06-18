import axios from "axios";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChartChartjs from "../jsx/components/charts/Chartjs";

const authContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
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

        console.log("Axios response:", response.data);
      } catch (err) {
        console.error("Axios error:", err.message);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const authenticateUser = (email, password) => {
    console.log(email, password);
    navigate("/dashboard");
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
