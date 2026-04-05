import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: ''
}

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload
        }
    }
})


export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;