import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allInvoices:[],
    currentInvoice:null,
    // filteredOptimizedInvoices
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
        // setFilteredOptimizedInvoices:(state,{payload})=>{
        //     state.filteredOptimizedInvoices = payload
        // },
    }
})

export default invoicesSlice.reducer
export const {setAllInvoices,setCurrentInvoice} = invoicesSlice.actions