import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')):null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setCredits: (state, action) => {
            const {message,token, user} = action.payload

            state.user = {...user}
            state.token = token.access_token

            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem('token', JSON.stringify(state.token));

        },
        logOut: (state) => {
            state.user = null
            state.token = null

            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    },
})

export const {setCredits, logOut} = authSlice.actions
// console.log(authSlice.actions.setCredits)
export default authSlice.reducer


