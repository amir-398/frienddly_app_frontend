import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialeStateProps {
  isVisible: boolean;
}

const initialState: InitialeStateProps = {
  isVisible: false,
};
const loadingScreenSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setLoadingScreenIsVisible(state, action: PayloadAction<boolean>) {
      state.isVisible = action.payload as InitialeStateProps["isVisible"];
    },
  },
});

export const { setLoadingScreenIsVisible } = loadingScreenSlice.actions;
export default loadingScreenSlice.reducer;
