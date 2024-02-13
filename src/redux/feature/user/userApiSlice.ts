/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "../../api/apiSlice";

const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // Sign In / Login User
    signInUser: builder.mutation({
      query: (body: { user: { email: string; password: string } }) => {
        return {
          url: "/users/login",
          method: "POST",
          body,
        };
      },
    }),
    // Sign Up / Register New User
    signupUser: builder.mutation({
      query: (body: {
        user: {
          firstName: string;
          lastName: string;
          email: string;
          password: string;
        };
      }) => {
        return {
          url: "/users/sign-up",
          method: "POST",
          body,
        };
      },
    }),
    // Get single User By ID
    getSingleUser: builder.query({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useSignInUserMutation,
  useSignupUserMutation,
  useGetSingleUserQuery,
} = userApiSlice;
