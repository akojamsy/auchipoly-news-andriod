import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (credentials) => ({
        url: 'auth/sign-in',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: 'auth/signup',
        method: 'POST',
        body: userInfo,
      }),
    }),
    getUserDetails:builder.query({
      query:(data)=>({
        url:`auth/profile`,
        // params: {}
      })
    })
  }),
});

export const { useSigninMutation, useSignupMutation, useGetUserDetailsQuery} = authApi;
