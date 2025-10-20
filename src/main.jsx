import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";     // <- use the App.jsx you already have
import "./index.css";           // or './App.css' if you use that

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
