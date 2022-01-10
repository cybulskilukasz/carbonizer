import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import estimatesSlice from "../features/estimates/estimatesSlice";

export const store = configureStore({
  reducer: {
    estimates: estimatesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
