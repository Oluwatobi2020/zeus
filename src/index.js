import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ThemeContext from "./context/ThemeContext";
import { UiTriggersProvider } from "../src/context/UiTriggersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter basename="/">
        <ThemeContext>
          <UiTriggersProvider>
            <App />
          </UiTriggersProvider>
        </ThemeContext>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
