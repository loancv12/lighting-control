import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const sensorRecsAdapter = createEntityAdapter({});

const initialState = sensorRecsAdapter.getInitialState();

export const sensorRecsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecordsInDay: builder.query({
      query: (params) => {
        return {
          url: "/sensor-records/in-day",
          params,
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError;
          },
        };
      },
      transformResponse: (responseData) => {
        const loadedSensorRecs = responseData.data.map((sensorRec) => {
          sensorRec.id = sensorRec._id;
          return sensorRec;
        });
        return sensorRecsAdapter.addMany(initialState, loadedSensorRecs);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "SensorRec", id: "LIST" },
            ...result.ids.map((id) => ({ type: "SensorRec", id })),
          ];
        } else return [{ type: "SensorRec", id: "LIST" }];
      },
    }),
    getRecordsInPeriod: builder.query({
      query: (params) => {
        return {
          url: "/sensor-records/in-period",
          params,
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError;
          },
        };
      },
      transformResponse: (responseData) => {
        const loadedSensorRecs = responseData.data.map((sensorRec) => {
          sensorRec.id = sensorRec._id;
          return sensorRec;
        });
        return sensorRecsAdapter.addMany(initialState, loadedSensorRecs);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "SensorRec", id: "LIST" },
            ...result.ids.map((id) => ({ type: "SensorRec", id })),
          ];
        } else return [{ type: "SensorRec", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetRecordsInDayQuery, useGetRecordsInPeriodQuery } =
  sensorRecsApiSlice;
