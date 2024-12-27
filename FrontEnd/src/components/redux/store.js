import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slide/userSlide";
import productReducer from "./Slide/productSlide";
import orderReducer from "./Slide/orderSlide";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["user", "product"], // blacklist specific slices of state
};

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  order: orderReducer,
  // Add other reducers here if needed
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
