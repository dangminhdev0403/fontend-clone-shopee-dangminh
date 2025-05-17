import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import { router } from "@pages/router.tsx";
import { queryClient } from "@react-query/queryClient";
import { store } from "@redux/store.ts";
import { proccess } from "@service/axios.custom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
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
        {proccess.VITE_MODE === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}{" "}
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
