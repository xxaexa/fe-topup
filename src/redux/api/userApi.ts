import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { IUserRequest, User } from "./../../types/";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<User, string | undefined>({
      query(id) {
        return {
          url: `/users/${id}`,
        };
      },
      providesTags: ["User"],
      transformResponse: (response: User) => response,
    }),

    getUsers: builder.query<User[], void>({
      query() {
        return {
          url: `/users/`,
        };
      },
      providesTags: [{ type: "User", id: "LIST" }],
      transformResponse: (response: { users: User[] }) => response.users,
    }),

    updateUser: builder.mutation<IUserRequest, IUserRequest>({
      query(values) {
        console.log(values);
        return {
          url: `/users/${values._id}`,
          method: "put",
          body: values,
        };
      },
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation<IUserRequest, string>({
      query(id) {
        return {
          url: `/users/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
