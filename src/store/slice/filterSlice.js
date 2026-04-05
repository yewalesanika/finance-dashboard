import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search:'',
    type:'all',
    category:'all'
}

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        searchFilter:(state,action)=>{
            state.search = action.payload
        },
        typeFilter:(state,action)=>{
            state.type = action.payload
        },
        categoryFilter:(state,action)=>{
            state.category = action.payload
        }
    }
})

export const { searchFilter,typeFilter,categoryFilter } = filterSlice.actions;
export default filterSlice.reducer;
