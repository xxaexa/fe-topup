import { createSlice } from "@reduxjs/toolkit";

interface IToggleState {
  toggle: boolean;
}

const initialState: IToggleState = {
  toggle: false,
};

export const toggleSlice = createSlice({
  initialState,
  name: "toggleSlice",
  reducers: {
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
  },
});

export default toggleSlice.reducer;

export const { setToggle } = toggleSlice.actions;
