/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "../../api/apiSlice";

const sellApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // Make Sales
    addSale: builder.mutation({
      query: (body: {
        sell: {
          seller: string;
          buyer: string;
          salesQuantity: number;
          totalPrice: number;
          salesDate: string;
        };
      }) => {
        return {
          url: "/sell",
          method: "POST",
          body,
        };
      },
    }),
    // Get all Sales
    getSales: builder.query<any, void>({
      query: () => "/sell",
    }),
  }),
});

export const { useAddSaleMutation, useGetSalesQuery } = sellApiSlice;
