import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slide/userSlide";

export const store = configureStore({
    reducer: {
        user: userReducer,
        // Add other reducers here if needed
    }
})