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
            })
        }),
        loginWithPhoneNumber: builder.mutation({
            query: credentials => ({
                url: '/users/signinPhone',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        //endPoint to get user details using the endPoint
        GetUserDetails: builder.query({
            query: () => ({
                url: '/users/getUser',
                method: 'GET',
                providesTags: ['User-Details']
            })
        }),
        GetUserWalletDetails: builder.query({
            query: () => ({
                url: '/users/getWallet',
                method: 'GET',
                providesTags: ['User-Details']
            })
        }),
        UpdateUserDetails: builder.mutation({
            query: ({id,...rest}) => ({
                url: `/users/updateUser/${id}`,
                method: 'POST',
                body: rest,
            }),
            invalidatesTags:['User-Details']
        }),
        UpdateUserImage: builder.mutation({
            query: ({id,...rest}) => ({
                url: `/users/updateUserImage/${id}`,
                method: 'POST',
                body: rest,
            }),
            invalidatesTags:['User-Details']
        }),
        GetAllCardGames: builder.query({
            query: () => ({
                url:'/users/getOngoingGames',
                method: 'GET',
                providesTags: ['Games']
            })
        }),
        GetCardGamesById: builder.query({
            query: (id) => ({
                url:`/users/getGameById/${id}`,
                method: 'GET',
            })
        }),
        PayCardGamesById: builder.mutation({
            query: (id) => ({
                url: `/users/payForGame/${id}`,
                method: 'POST',
            }),
            invalidatesTags:['User-Details']
        }),
        
    })
})

export const {
    useSignUpMutation,
    useLoginMutation,
    useLoginWithPhoneNumberMutation,
    useGetUserDetailsQuery,
    useUpdateUserDetailsMutation,
    useUpdateUserImageMutation,
    useGetAllCardGamesQuery,
    useGetCardGamesByIdQuery,
    useGetUserWalletDetailsQuery,
    usePayCardGamesByIdMutation,
} = authApiSlice