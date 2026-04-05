import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slice/dataSlice.js"
import filterReducer from "./slice/filterSlice.js"
import operationReducer from "./slice/operationSlice.js"
import roleReducer from "./slice/roleSlice.js"

const store = configureStore({
    reducer:{
        data:dataReducer,
        filter:filterReducer,
        operation:operationReducer,
        role:roleReducer
    }
})

export default store