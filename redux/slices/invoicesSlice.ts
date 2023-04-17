import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allInvoices:[],
    currentInvoice:null,
    runEditOnLoad:false,
}

const invoicesSlice = createSlice({
    name:"invoices",
    initialState,
    reducers:{
        setAllInvoices:(state,{payload})=>{
            state.allInvoices = payload
        },
        setCurrentInvoice:(state,{payload})=>{
            state.currentInvoice = payload
        },
        setRunEditOnLoad:(state,{payload})=>{
            state.runEditOnLoad = payload
        },
    }
})

export default invoicesSlice.reducer
export const {setAllInvoices,setCurrentInvoice,setRunEditOnLoad} = invoicesSlice.actions