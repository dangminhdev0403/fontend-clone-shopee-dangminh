// redux/api/rootApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReAuth } from "./baseQuery";

export const rootApi = createApi({
  baseQuery: baseQueryWithReAuth,
  reducerPath: "api",
  endpoints: () => ({}),
});
