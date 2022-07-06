import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    token: null,
    user: null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setCredits: (state, action) => {
            const {message,token, user} = action.payload

            state.user = {...user}
            state.token = token.access_token

        },
        logOut: (state) => {
            state.user = null
            state.token = null
        }
    },
})

export const {setCredits, logOut} = authSlice.actions
export default authSlice.reducer


