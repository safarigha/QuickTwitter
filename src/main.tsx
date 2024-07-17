import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./contexts/UserContext";
import Modal from "react-modal";

const reactQueryClient = new QueryClient();

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={reactQueryClient}>
      <UserProvider>
        <Router>
          <App />
        </Router>
        <ToastContainer rtl />
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
