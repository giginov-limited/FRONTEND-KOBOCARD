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
                body: {...credentials },
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
                providesTags: ['User-Details']
            })
        }),
        GetUserGames: builder.query({
            query: () => ({
                url: '/users/getUserGames',
                method: 'GET',
                providesTags: ['User-Details']
            })
        }),
        GetUserGamesPerPage: builder.query({
            query: (props) => ({
                url: `/getUserGamesPerPage?page=${props.currentPage}&perPage=${props.itemsPerPage}`,
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


        //User wallet.
        GetUserWalletDetails: builder.query({
            query: () => ({
                url: '/users/getWallet',
                method: 'GET',
                providesTags: ['User-Details']
            })
        }),
        FundWalltet: builder.mutation({
            query: ({id,user_id,am}) => ({
                url: `/users/fundWallet/?userId=${user_id}&walletId=${id}`,
                method: 'POST',
                body: am,
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
        GetAllCardGamesPerPage: builder.query({
            query: (props) => ({
                url:`/users/getOngoingGamesPerPage?page=${props.currentPage}&perPage=${props.itemsPerPage}`,
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
        resetPassword: builder.mutation({
            query: (id) => ({
                url: `/users/reset`,
                method: 'POST',
            }),
            invalidatesTags:['User-Details']
        }),
        generateOtp: builder.mutation({
            query: () => ({
                url: "/users/generatePhoneOtp",
                method: "POST",
            })
        }),
        validateOtp: builder.mutation({
            query: (OTP) => ({
                url: `/users/validatePhoneOtp/${OTP}`,
                method: 'POST',
            })
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
    useGetUserGamesQuery,
    useFundWalltetMutation,
    useResetPasswordMutation,
    useGenerateOtpMutation,
    useValidateOtpMutation,
    useGetAllCardGamesPerPageQuery,
    useGetUserGamesPerPageQuery,
} = authApiSlice