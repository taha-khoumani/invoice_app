import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme:'light',
    isFilterOn:false,
    filter:'All'
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
    }
})

export default uiSlice.reducer
export const {setTheme,toggleFilter,setFilter} = uiSlice.actions