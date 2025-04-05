import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import {
  Voucher,
  VoucherResponse,
  CreateVoucherRequest,
} from "../../types/index";

export const voucherApi = createApi({
  reducerPath: "voucherApi",
  baseQuery: customFetchBase,
  tagTypes: ["Voucher"],
  endpoints: (builder) => ({
    getVouchers: builder.query<Voucher[], void>({
      query: () => ({
        url: "/voucher/",
      }),
      transformResponse: (response: VoucherResponse) => response.data,
      providesTags: [{ type: "Voucher", id: "LIST" }],
    }),

    getVoucherById: builder.query<Voucher, string>({
      query: (id) => ({
        url: `/voucher/${id}`,
      }),
      transformResponse: (response: { data: Voucher[] }) => response.data[0],
      providesTags: (result, error, id) => [{ type: "Voucher", id }],
    }),

    createVoucher: builder.mutation<unknown, CreateVoucherRequest>({
      query: (body) => ({
        url: "/voucher",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: Voucher[] }) => response.data[0],
      invalidatesTags: [{ type: "Voucher", id: "LIST" }],
    }),

    // updateVoucher: builder.mutation<unknown, UpdateVoucherRequest>({
    //   query: ({ _id, ...body }) => ({
    //     url: `/voucher/${_id}`,
    //     method: "PUT",
    //     body,
    //   }),
    //   invalidatesTags: (result, error, { _id }) => [
    //     { type: "Voucher", id: _id },
    //     { type: "Voucher", id: "LIST" },
    //   ],
    // }),useUpdateVoucherMutation
  }),
});

export const {
  useGetVouchersQuery,
  useGetVoucherByIdQuery,
  useCreateVoucherMutation,
  
} = voucherApi;
