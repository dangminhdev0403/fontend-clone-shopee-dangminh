import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated?: boolean;
  accessToken?: string;
  user: {
    name: string;
    email: string;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: "",
  user: null,
};

export const authSilce = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: AuthState, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
  },
});

export const authReducer = authSilce.reducer;
