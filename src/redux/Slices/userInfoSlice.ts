import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface initialeStateProps {
  userInfo: {
    firstname?: string;
    lastname?: string;
    birthdate?: string;
    email?: string;
    password?: string;
    profilImage?: File;
  };
}

const initialState: initialeStateProps = {
  userInfo: {},
};

const userInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<object>) {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
});

export const { setUserInfo } = userInfo.actions;
export const selectActiveSection = (state: RootState) =>
  state.userInfo.activeSection;
export default userInfo.reducer;
