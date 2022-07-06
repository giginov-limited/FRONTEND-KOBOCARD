import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../../features/authSlice';
import { signInApi } from "../api/api";

export const store = configureStore({
    reducer:{
        [signInApi.reducerPath]: signInApi.reducer,
        auth:authReducer
    },

    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(signInApi.middleware)
})