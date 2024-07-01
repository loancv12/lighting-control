import { createSlice } from "@reduxjs/toolkit";

const areaSlice = createSlice({
  name: "area",
  initialState: {
    selectedAreaId: null,
  },
  reducers: {
    setSelectedAreaId: (state, action) => {
      const { areaId } = action.payload;
      state.selectedAreaId = areaId;
    },
  },
});

export const { reducer, actions } = areaSlice;

export default reducer;

export const { setSelectedAreaId } = actions;

export const selectAreaId = (state) => state.area.selectedAreaId;
