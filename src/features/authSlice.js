import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')):null,
    refreshToken: localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken')):null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setCredits: (state, action) => {
            const {token, user} = action.payload

            state.user = {...user}
            state.token = token.access_token
            state.refreshToken = token.refresh_token

            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem('token', JSON.stringify(state.token));
            localStorage.setItem('refreshToken', JSON.stringify(state.refreshToken));

        },
        setRefreshToken:(state,action) => {
            const {tokens} = action.payload
            console.log(tokens)

            state.token = tokens.access_token
            state.refreshToken = tokens.refresh_token

            localStorage.setItem('token', JSON.stringify(state.token));
            localStorage.setItem('refreshToken', JSON.stringify(state.refreshToken));
        },
        logOut: (state) => {
            state.user = null
            state.token = null

            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    },
})

export const {setCredits,setUserDetails, logOut, setRefreshToken} = authSlice.actions
export default authSlice.reducer



