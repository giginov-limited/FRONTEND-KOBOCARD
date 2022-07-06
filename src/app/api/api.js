import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredits,logOut } from '../../features/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://kobo-card.herokuapp.com',

   prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token

    console.log(token)

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    };
     
    console.log(headers);
    return headers
  },
})


const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        //conditional to check if the refresh worked
        if (refreshResult?.data) {
            // i think this is to fetch data from the state using the credentials
            const user = api.getState().auth.user
            // store the new token 
            api.dispatch(setCredits({ ...refreshResult.data, user }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
            console.log(result)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const signInApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})