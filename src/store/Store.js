import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../features/userSlice.js"
import postReducer from "../features/postSlice.js"

export const store = configureStore({
    reducer:{
        userReducer,
        postReducer
    }
})