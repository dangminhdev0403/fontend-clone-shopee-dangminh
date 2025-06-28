// src/pages/router.tsx

import App from "@App";
import Login from "@components/Login";
import Register from "@components/Register";
import ProtectedRoute from "@components/RouteGuards/ProtectedRoute";
import RejectRoute from "@components/RouteGuards/RejectRoute";
import Auth from "@pages/Auth";
import CheckOutPage from "@pages/CheckOut";
import NotFound from "@pages/Errors/NotFound";
import { ProductDetail } from "@pages/Product";
import { ROUTES } from "@utils/constants/route";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const ListProduct = lazy(() => import("@pages/Product/ListProduct"));
const CartPage = lazy(() => import("@pages/Cart/CartPage"));
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
      {
        path: ROUTES.PRODUCT_DETAIL,
        element: <ProductDetail />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.CART,
            element: <CartPage />,
          },
          {
            path: ROUTES.CHECKOUT,
            element: <CheckOutPage />,
          },
        ],
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
