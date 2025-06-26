import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ThemeContext from "./context/ThemeContext";
import { UiTriggersProvider } from "../src/context/UiTriggersContext";
import { AuthProvider } from "./context/AuthContext";
import { DocumentProvider } from "./context/DocumentContext";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter basename="/">
        <AuthProvider>
          <DocumentProvider>
            <ThemeContext>
              <UiTriggersProvider>
                <App />
                <Toaster />
              </UiTriggersProvider>
            </ThemeContext>
          </DocumentProvider>
        </AuthProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
