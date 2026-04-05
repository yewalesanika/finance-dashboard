import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/transaction_data.js"

const initialState = {
    data: data
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        updateTransaction: (state, action) => {
            const index = state.data.findIndex((t) => t.id === action.payload.id)
            if (index !== -1) state.data[index] = action.payload
        },
        deleteTransaction: (state, action) => {
            state.data = state.data.filter((t) => t.id !== action.payload)
        },
        addTransaction: (state, action) => {
            state.data.push(action.payload)
        }
    }
})

export const { updateTransaction, deleteTransaction, addTransaction } = dataSlice.actions
export default dataSlice.reducer