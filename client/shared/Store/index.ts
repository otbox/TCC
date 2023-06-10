import {Action, ThunkAction, configureStore} from "@reduxjs/toolkit";

import userReducer from "./reducers/userReducer";
import globalReducer from "./reducers/globalReducer";

export const store = configureStore({
    reducer: {
        user : userReducer,
        counter : globalReducer,
    },

});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export default store;