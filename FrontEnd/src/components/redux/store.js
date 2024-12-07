import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slide/userSlide";
import productReducer from "./Slide/productSlide";

export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        // Add other reducers here if needed
    }
})