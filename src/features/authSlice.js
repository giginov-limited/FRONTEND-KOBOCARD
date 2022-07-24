import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')):null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):null,
    userDetails:localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')):null
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
        setUserDetails:(state, action) => {
            console.log(action.payload)
            state.userDetails = action.payload
            localStorage.setItem('userDetails', JSON.stringify(state.userDetails));
        },
        logOut: (state) => {
            state.user = null
            state.userDetails = null
            state.token = null

            localStorage.removeItem('user');
            localStorage.removeItem('userDetails');
            localStorage.removeItem('token');
        }
    },
})

export const {setCredits,setUserDetails, logOut} = authSlice.actions
// console.log(authSlice.actions.setCredits)
export default authSlice.reducer


