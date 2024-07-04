import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const areasAdapter = createEntityAdapter({});

const initialState = areasAdapter.getInitialState();

export const areasApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAreas: builder.query({
      query: () => ({
        url: "/areas",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedAreas = responseData.data.map((area) => {
          area.id = area._id;
          return area;
        });
        return areasAdapter.setAll(initialState, loadedAreas);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Area", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Area", id })),
          ];
        } else return [{ type: "Area", id: "LIST" }];
      },
    }),
    addNewArea: builder.mutation({
      query: (body) => ({
        url: "/areas",
        method: "POST",
        body: {
          ...body,
        },
      }),
      invalidatesTags: (result, error, body) => [
        { type: "Area", id: "LIST" },
        { type: "Account", id: body.userId },
      ],
    }),
  }),
});

export const { useGetAreasQuery, useAddNewAreaMutation } = areasApiSlice;

// returns the query result object
export const selectAreasResult = areasApiSlice.endpoints.getAreas.select();

// creates memoized selector
const selectAreasData = createSelector(
  selectAreasResult,
  (areasResult) => areasResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllAreas,
  selectById: selectAreaById,
  selectIds: selectAreaIds,
  // Pass in a selector that returns the areas slice of state
} = areasAdapter.getSelectors(
  (state) => selectAreasData(state) ?? initialState
);
