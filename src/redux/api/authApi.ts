import { authSlice } from "@redux/slices/authSlice";
import { RootState } from "@redux/store"; // 👈 import đúng kiểu RootState
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "@service/apiRoutes";
import { ROUTES } from "@utils/constants/route";
import { UserLogin, UserRegister } from "@utils/constants/types/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state: RootState = getState() as RootState;
    const token = state.auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  const url = typeof args === "string" ? args : (args.url || "").toString();
  if (result.error?.status === 401 && !url.includes(API_ROUTES.AUTH.LOGIN)) {
    api.dispatch(authSlice.actions.setLogOut());

    window.location.href = ROUTES.LOGIN;
  }
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => {
    return {
      sinUp: builder.mutation({
        query: ({ name, email, password }: UserRegister) => ({
          url: API_ROUTES.AUTH.REGISTER,
          method: "POST",
          body: { name, email, password },
        }),
      }),
      login: builder.mutation({
        query: ({ email, password }: UserLogin) => ({
          url: API_ROUTES.AUTH.LOGIN,
          method: "POST",
          body: { email, password },
        }),
      }),
      logOut: builder.mutation({
        query: () => ({
          url: API_ROUTES.AUTH.LOGOUT,
          method: "POST",
        }),
      }),
    };
  },
});

export const { useSinUpMutation, useLoginMutation, useLogOutMutation } =
  authApi;
