import { signInApi } from "./api"
// this was a very stupid decision
//lets try to put the ednpoints in the apiSlice

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
                body: { ...credentials }
            })
        }),
        loginWithPhoneNumber: builder.mutation({
            query: credentials => ({
                url: '/users/signinPhone',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const {
    useSignUpMutation,
    useLoginMutation,
    useLoginWithPhoneNumberMutation,
} = authApiSlice