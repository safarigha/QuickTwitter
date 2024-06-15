import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./contexts/UserContext";

const reactQueryClient = new QueryClient();

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

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { UserProvider } from "../src/contexts/UserContext";
// import App from "./App";

// const reactQueryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <QueryClientProvider client={reactQueryClient}>
//       <UserProvider>
//         <App />
//         <ToastContainer rtl />
//       </UserProvider>
//     </QueryClientProvider>
//   </React.StrictMode>
// );
