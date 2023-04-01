import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme:'light'
}

const uiSlice = createSlice({
    name:"ui",
    initialState,
    reducers:{
        setTheme:(state,{payload})=>{
            state.theme = payload
        },
    }
})

export default uiSlice.reducer
export const {setTheme} = uiSlice.actions