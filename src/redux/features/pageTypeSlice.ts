import { createSlice } from "@reduxjs/toolkit";

interface IPageTypeState {
  content: boolean;
  sidebar: boolean;
  subSidebar: boolean;
}

const initialState: IPageTypeState = {
  content: false,
  sidebar: false,
  subSidebar: false,
};

export const pageTypeSlice = createSlice({
  initialState,
  name: "pageTypeSlice",
  reducers: {
    setContentTrue: (state) => {
      state.content = true;
      state.sidebar = false;
      state.subSidebar = false;
    },
    setContentFalse: (state) => {
      state.content = false;
      state.sidebar = true;
      state.subSidebar = true;
    },
  },
});

export default pageTypeSlice.reducer;

export const { setContentTrue, setContentFalse } = pageTypeSlice.actions;
