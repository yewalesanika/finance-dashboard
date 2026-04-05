import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editId: '',
    deleteId: ''
}

const operationSlice = createSlice({
    name: 'operation',
    initialState,
    reducers: {
        editOperation: (state, action) => {
            state.editId = action.payload
        },
        deleteOperation: (state, action) => {
            state.deleteId = action.payload
        }
    }
})

export const { editOperation, deleteOperation } = operationSlice.actions;
export default operationSlice.reducer;