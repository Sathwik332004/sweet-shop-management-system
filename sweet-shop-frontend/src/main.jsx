import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#1a1f1b",
          color: "#fff",
          border: "1px solid #669928",
        },
        success: {
          iconTheme: { primary: "#669928", secondary: "#1a1f1b" },
        },
        error: {
          iconTheme: { primary: "#ef4444", secondary: "#1a1f1b" },
        },
      }}
    />
  </React.StrictMode>
);
