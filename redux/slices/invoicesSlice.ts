import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allInvoices:[],
    filteredOptimizedInvoices:[]
}

const invoicesSlice = createSlice({
    name:"invoices",
    initialState,
    reducers:{
        setAllInvoices:(state,{payload})=>{
            state.allInvoices = payload
        },
        setFilteredOptimizedInvoices:(state,{payload})=>{
            state.filteredOptimizedInvoices = payload
        },
    }
})

export default invoicesSlice.reducer
export const {setAllInvoices,setFilteredOptimizedInvoices} = invoicesSlice.actions