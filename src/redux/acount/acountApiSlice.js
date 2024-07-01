import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const accountsAdapter = createEntityAdapter({});

const initialState = accountsAdapter.getInitialState();

export const accountsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: () => ({
        url: "/accounts",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedAccounts = responseData.map((account) => {
          account.id = account._id;
          account.areas = account.areas.map((area) => {
            area.id = area._id;
            return area;
          });
          return account;
        });
        return accountsAdapter.setAll(initialState, loadedAccounts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Account", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Account", id })),
          ];
        } else return [{ type: "Account", id: "LIST" }];
      },
    }),
    addNewAccount: builder.mutation({
      query: (initialAccountData) => ({
        url: "/accounts",
        method: "POST",
        body: {
          ...initialAccountData,
        },
      }),
      invalidatesTags: [{ type: "Account", id: "LIST" }],
    }),
  }),
});

export const { useGetAccountsQuery, useAddNewAccountMutation } =
  accountsApiSlice;

// returns the query result object
export const selectAccountsResult =
  accountsApiSlice.endpoints.getAccounts.select();

// creates memoized selector
const selectAccountsData = createSelector(
  selectAccountsResult,
  (accountsResult) => accountsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllAccounts,
  selectById: selectAccountById,
  selectIds: selectAccountIds,
  // Pass in a selector that returns the accounts slice of state
} = accountsAdapter.getSelectors(
  (state) => selectAccountsData(state) ?? initialState
);
