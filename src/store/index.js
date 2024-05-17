import { persistStore, persistReducer } from "redux-persist";
import { rootReducer } from "./rootReducer";
import { REDUX_PERSIST_KEY } from "../constant/common";
import { createStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: REDUX_PERSIST_KEY,
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;
