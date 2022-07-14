import { signInApi } from "./api"

export const authApiSlice = signInApi.injectEndpoints({
    endpoints: builder => ({
        signUp: builder.mutation({
            query: credentials => ({
                url: '/users/signup',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        login: builder.mutation({
            query: credentials => ({
                url: '/users/signinEmail',
                method: 'POST',
                body: { ...credentials },
                keepUnusedDataFor: 5,
            })
        }),
        loginWithPhoneNumber: builder.mutation({
            query: credentials => ({
                url: '/users/signinPhone',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        GetUserDetails: builder.query({
            query: () => ({
                url: '/users/getUser',
                method: 'GET',
                providesTags: ['User Details']
            })
        }),
    })
})

export const {
    useSignUpMutation,
    useLoginMutation,
    useLoginWithPhoneNumberMutation,
    useGetUserDetailsQuery,
} = authApiSlice