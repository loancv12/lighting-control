import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const ppfdsAdapter = createEntityAdapter({});

const initialState = ppfdsAdapter.getInitialState();

export const ppfdsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPpfds: builder.query({
      query: (selectDate) => {
        return {
          url: "/ppfds",
          params: { selectDate },
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError;
          },
        };
      },
      transformResponse: (responseData) => {
        const loadedPpfds = responseData.data.map((ppfd) => {
          ppfd.id = ppfd._id;
          return ppfd;
        });
        return ppfdsAdapter.setAll(initialState, loadedPpfds);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Ppfd", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Ppfd", id })),
          ];
        } else return [{ type: "Ppfd", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetPpfdsQuery } = ppfdsApiSlice;
