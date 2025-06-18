import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ThemeContext from "./context/ThemeContext";
import { UiTriggersProvider } from "../src/context/UiTriggersContext";
import { ChatProvider } from "./context/ChatContext";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter basename="/">
        <AuthProvider>
          <ChatProvider>
            <ThemeContext>
              <UiTriggersProvider>
                <App />
              </UiTriggersProvider>
            </ThemeContext>
          </ChatProvider>
        </AuthProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
