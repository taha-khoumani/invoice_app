import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme:'light',
    isFilterOn:false,
    filter:'All',
    isNewInvoiceOpen:false,
    isEditInvoiceOpen:false,
    isDeleteModuleOpen:false,
    isNotSignedInModuleOpen:false,
}

const uiSlice = createSlice({
    name:"ui",
    initialState,
    reducers:{
        setTheme:(state,{payload})=>{
            state.theme = payload
        },
        toggleFilter:(state,{payload})=>{
            state.isFilterOn = payload
        },
        setFilter:(state,{payload})=>{
            state.filter = payload
        },
        toggleNewInvoice:(state,{payload})=>{
            state.isNewInvoiceOpen = payload
        },
        toggleEditInvoice:(state,{payload})=>{
            state.isEditInvoiceOpen = payload
        },
        toggleDeleteModule:(state,{payload})=>{
            state.isDeleteModuleOpen = payload
        },
        toggleNotSignedInModule:(state,{payload})=>{
            state.isNotSignedInModuleOpen = payload
        },
    }
})

export default uiSlice.reducer
export const {
    setTheme,
    toggleFilter,
    setFilter,
    toggleNewInvoice,
    toggleEditInvoice,
    toggleDeleteModule,
    toggleNotSignedInModule
} = uiSlice.actions