import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')):null,
    refreshToken: localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken')):null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):null,
    session:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setCredits: (state, action) => {
            const {token, user} = action.payload
            console.log(action.payload)

            state.user = {...user}
            state.token = token.access_token
            state.refreshToken = token.refresh_token
            sessionStorage.setItem('user', JSON.stringify(state.user));
            sessionStorage.setItem('token', JSON.stringify(state.token));
            sessionStorage.setItem('refreshToken', JSON.stringify(state.refreshToken));

        },
        setRefreshToken:(state,action) => {
            const {tokens} = action.payload

            state.token = tokens.access_token
            state.refreshToken = tokens.refresh_token

            sessionStorage.setItem('token', JSON.stringify(state.token));
            sessionStorage.setItem('refreshToken', JSON.stringify(state.refreshToken));
        },
        setTimeOutMsg:(state,action) =>{
            state.session = action.payload
        },
        logOut: (state) => {
            state.user = null
            state.token = null

            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
        }
    },
})

export const {setCredits,setUserDetails, logOut, setRefreshToken, setTimeOutMsg} = authSlice.actions
export default authSlice.reducer



