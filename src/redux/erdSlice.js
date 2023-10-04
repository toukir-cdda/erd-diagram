import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ERD: {},
};

const erdSlice = createSlice({
  name: "ERD",
  initialState,
  reducers: {
    setErdData: (state, action) => {
      state.form = action.payload;
    },
  },
});

export const { setErdData } = erdSlice.actions;
export default erdSlice.reducer;
