import Login from "@components/Login/Login.tsx";
import Register from "@components/Register/Register.tsx";
import Auth from "@pages/Auth/Auth.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import ListProduct from "@pages/Product/ListProduct.tsx";
import App from "./App.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [{ path: "/", element: <ListProduct /> }],
  },
  {
    element: <Auth />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="light"
      transition={Bounce}
    />
  </StrictMode>,
);
