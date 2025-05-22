// src/pages/router.tsx

import App from "@App";
import Login from "@components/Login";
import Register from "@components/Register";
import RejectRoute from "@components/RouteGuards/RejectRoute";
import Auth from "@pages/Auth";
import NotFound from "@pages/Errors/NotFound";
import { ROUTES } from "@utils/constants/route";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const ListProduct = lazy(() => import("@pages/Product/ListProduct"));
export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,

    children: [
      {
        path: ROUTES.HOME,
        element: <ListProduct />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    element: <RejectRoute />,
    children: [
      {
        element: <Auth />,
        children: [
          { path: ROUTES.LOGIN, element: <Login /> },
          { path: ROUTES.REGISTER, element: <Register /> },
        ],
      },
    ],
  },
]);
