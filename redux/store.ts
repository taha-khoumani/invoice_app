import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from "./slices/uiSlice";
import invoicesSliceReducer from "./slices/invoicesSlice";

export const store = configureStore({
    reducer:{
        ui:uiSliceReducer,
        invoices:invoicesSliceReducer,
    }
})