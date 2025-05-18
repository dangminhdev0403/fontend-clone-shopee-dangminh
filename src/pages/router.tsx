// src/pages/router.tsx

import App from "@App";
import Login from "@components/Login";
import Register from "@components/Register";
import RejectRoute from "@components/RouteGuards/RejectRoute";
import Auth from "@pages/Auth";
import { ROUTES } from "@utils/constants/route";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const ListProduct = lazy(() => import("@pages/Product/ListProduct"));
export const router = createBrowserRouter([
  {
    element: <App />,
    children: [{ path: ROUTES.HOME, element: <ListProduct /> }],
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
