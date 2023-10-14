import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.tsx";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.tsx";
import UserManagement from "./pages/UserManagement.tsx";
import EstufaView from "./pages/EstufaView.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Homepage",
    element: <App />,
  },
  {
    path: "/UserManagement",
    element: <UserManagement />,
  },
  {
    path: "/EstufaPage",
    element: <EstufaView />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
