import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    invoices:[]
}

const invoicesSlice = createSlice({
    name:"invoices",
    initialState,
    reducers:{
        setInvoices:(state,{payload})=>{
            state.invoices = payload
        },
    }
})

export default invoicesSlice.reducer
export const {setInvoices} = invoicesSlice.actions