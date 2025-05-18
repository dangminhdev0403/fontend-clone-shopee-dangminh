import { authApi } from "@redux/api/authApi";
import { actionHandlerMiddleware } from "@redux/middleware/middleware";
import { authReducer } from "@redux/slices/authSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createPersistedReducer } from "@utils/redux/persistReducerHelper";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

// Kết hợp các reducer
const rootReducer = combineReducers({
  // Persist riêng cho authReducer
  auth: createPersistedReducer("auth", authReducer),
  // Không persist api reducer (thường không nên lưu cache vào localStorage)
  [authApi.reducerPath]: authApi.reducer,
});

// Tạo store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Bỏ qua các action đặc biệt của redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, actionHandlerMiddleware), // Thêm middleware của RTK Query
});

// Khởi tạo persistor (dùng cho PersistGate)
export const persistor = persistStore(store);

// Kiểu của RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
