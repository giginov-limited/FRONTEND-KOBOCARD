import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredits,logOut,setRefreshToken } from '../../features/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://kobo-card.herokuapp.com',
    credentials: 'omit',
    // mode:'cors',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      console.log(token)

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }else {
        console.log('no token')
      }

      return headers
    }
})



const baseQueryWithReauth = async (args, api, extraOptions) => {

  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshtoken = api.getState().auth.refreshToken
    const refreshResult = await baseQuery({
        url: '/users/generateTokens',
        method: 'POST',
        body:{'refresh_token':refreshtoken},
        }, api, extraOptions)

        console.log(refreshResult.data)

    if (refreshResult.data) {
      // store the new token
      api.dispatch(setRefreshToken({ ...refreshResult.data}))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }
  return result

}

export const signInApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
    tagTypes:['User-Details', 'Games'],
})