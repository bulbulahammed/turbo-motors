/* eslint-disable @typescript-eslint/no-unused-vars */
import { ParamSerialization } from "../../../lib/ParamSerialization";
import { api } from "../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //Get All Product
    getProduct: builder.query({
      query: (args: Record<string, unknown>) => {
        const query = args ? ParamSerialization(args) : "";
        return `/product?${query}`;
      },
      providesTags: ["Product"],
    }),

    // Add Product
    addProduct: builder.mutation({
      query: (body: {
        product: {
          title: string;
          img: string;
          price: number;
          releaseDate: string;
          brand: string;
          model: string;
          type: string;
          size: string;
          color: string;
          suspension: string;
          quantity: number;
          seller: string;
        };
      }) => {
        return {
          url: "/product",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),

    // Update Product
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `product/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    //Delete Product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    // Delete Multiple Products
    deleteMultiProduct: builder.mutation({
      query: (body: { ids: string[] }) => ({
        url: "product/delete-selected",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    // Get Latest Product
    getLatestProduct: builder.query({
      query: () => `product/?limit=6&sortBy=createdAt&sortOrder=desc`,
      providesTags: ["Product"],
    }),

    // Get Single Product
    getSingleProduct: builder.query({
      query: (id) => `product/${id}`,
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductQuery,
  useGetLatestProductQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteMultiProductMutation,
} = productApi;
