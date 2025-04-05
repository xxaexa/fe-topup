import { createApi } from "@reduxjs/toolkit/query/react";
import { ILoginProps, IUserResponse } from "../../types";
import customFetchBase from "./customFetchBase";

// authApi.ts
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    loginUser: builder.mutation<IUserResponse, ILoginProps>({
      query(values) {
        return {
          url: "auth/login",
          method: "POST",
          body: values,
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "auth/logout",
          method: "POST",
        };
      },
    }),

    refreshToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "auth/refresh-token",
        method: "POST",
        credentials: "include", // agar refreshToken cookie dikirim
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRefreshTokenMutation,
} = authApi;




