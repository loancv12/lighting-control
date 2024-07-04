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
        responseData.data.id = responseData.data._id;
        return responseData.data;
      },
      providesTags: (result, error, params) => {
        return [{ type: "Config", id: result.id }];
      },
    }),
    updateConfig: builder.mutation({
      query: (body) => ({
        url: "/config",
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, body) => {
        return [{ type: "Config", id: body.configId }];
      },
    }),
  }),
});

export const { useGetConfigQuery, useUpdateConfigMutation } = configsApiSlice;
