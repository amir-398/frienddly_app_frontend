import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialeStateProps {
  isVisible: boolean;
}

const initialState: InitialeStateProps = {
  isVisible: true,
};

const bottomBarIsVisible = createSlice({
  name: "bottomBarIsVisible",
  initialState,
  reducers: {
    setBottomBarIsVisible(state, action: PayloadAction<boolean>) {
      state.isVisible = action.payload as InitialeStateProps["isVisible"];
    },
  },
});

export const { setBottomBarIsVisible } = bottomBarIsVisible.actions;
export default bottomBarIsVisible.reducer;
