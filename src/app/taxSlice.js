// src/features/taxes/taxApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taxApi = createApi({
  reducerPath: "taxApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://685013d7e7c42cfd17974a33.mockapi.io/",
  }),
  endpoints: (builder) => ({
    getTaxes: builder.query({
      query: () => "taxes",
    }),
    getCountries: builder.query({
      query: () => "countries",
    }),
    updateTax: builder.mutation({
      query: (data) => {
        return {
          url: `taxes/${data.id}`,
          method: "PUT",
          body: data.row,
        };
      },
      invalidatesTags: ["Post"],
    }),
  }),
});

// Export hooks for both queries
export const { useGetTaxesQuery, useGetCountriesQuery, useUpdateTaxMutation } =
  taxApi;
