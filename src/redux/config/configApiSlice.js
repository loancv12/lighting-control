import { apiSlice } from "../apiSlice";

export const configsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConfig: builder.query({
      query: () => ({
        url: "/config",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        responseData.data.id = responseData.data._id;
        return responseData.data;
      },
    }),
  }),
});

export const { useGetConfigQuery } = configsApiSlice;
