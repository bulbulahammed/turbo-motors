import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/v1/",
    baseUrl: "https://turbo-motors-server.vercel.app/api/v1/",
  }),
  tagTypes: ["Product", "User", "Sell"],
  endpoints: () => ({}),
});
