import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const dlisAdapter = createEntityAdapter({});

const initialState = dlisAdapter.getInitialState();

export const dlisApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDlis: builder.query({
      query: (selectDates) => {
        return {
          url: "/dlis",
          params: selectDates,
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError;
          },
        };
      },
      transformResponse: (responseData) => {
        const loadedDlis = responseData.data.map((dli) => {
          dli.id = dli._id;
          return dli;
        });
        return dlisAdapter.setAll(initialState, loadedDlis);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Dli", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Dli", id })),
          ];
        } else return [{ type: "Dli", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetDlisQuery } = dlisApiSlice;
