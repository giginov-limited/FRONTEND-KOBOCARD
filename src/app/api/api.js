import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut,setRefreshToken , setTimeOutMsg} from '../../features/authSlice'


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
  credentials: 'omit',
  mode:'cors',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
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
      api.dispatch(setTimeOutMsg("Session Time Out"))
      api.dispatch(logOut())
      api.dispatch(setTimeOutMsg(null))
    }
  }
  return result

}

export const signInApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
    tagTypes:['User-Details', 'Games'],
})