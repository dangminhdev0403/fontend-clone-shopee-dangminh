import { authSlice } from "@redux/slices/authSlice";
import { persistor } from "@redux/store";
import { Middleware } from "redux";

export const logOutMiddleware: Middleware =
  () => (next) => (action: unknown) => {
    if (
      typeof action === "object" &&
      action !== null &&
      "type" in action &&
      (action as { type: unknown }).type === authSlice.actions.setLogOut.type
    ) {
      persistor.purge();
    }
    return next(action);
  };
