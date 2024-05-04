import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MapProvider } from "./context/MapContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MapProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </MapProvider>
    </BrowserRouter>
  </React.StrictMode>
);
