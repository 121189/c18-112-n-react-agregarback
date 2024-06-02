import React from "react";
import ReactDOM from "react-dom/client";
import Axios from "axios";
import { Provider } from "react-redux";

import "./index.css";
import { store } from "./redux/store";
import App from "./App.jsx";
import { apiURL } from "./config.js";

Axios.defaults.baseURL = import.meta.env.BACKENDURL || apiURL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
