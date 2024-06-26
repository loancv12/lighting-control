import { apiSlice } from "../apiSlice";

export const configsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConfig: builder.query({
      query: (params) => ({
        url: "/config",
        params,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        console.log("responseData", responseData);
        responseData.data.id = responseData.data._id;
        return responseData.data;
      },
    }),
  }),
});

export const { useGetConfigQuery } = configsApiSlice;
