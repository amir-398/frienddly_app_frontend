import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialeStateProps {
  userInfo: {
    firstname?: string;
    lastname?: string;
    birthDate?: string;
    email?: string;
    password?: string;
    profilImage?: File;
  };
}

const initialState: initialeStateProps = {
  userInfo: {},
};

const signUpUserInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<object>) {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
});

export const { setUserInfo } = signUpUserInfoSlice.actions;
export default signUpUserInfoSlice.reducer;
