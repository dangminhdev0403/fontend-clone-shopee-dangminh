import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "@service/apiRoutes";
import { UserLogin, UserRegister } from "@utils/constants/types/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
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
      logout: builder.mutation({
        query: () => ({
          url: API_ROUTES.AUTH.LOGOUT,
          method: "POST",
          body: {},
        }),
      }),
    };
  },
});

export const { useSinUpMutation, useLoginMutation } = authApi;
