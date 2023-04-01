import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from "./slices/uiSlice";

export const store = configureStore({
    reducer:{
        ui:uiSliceReducer,
    }
})