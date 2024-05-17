import { combineReducers } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

export const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});
