import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialeStateProps {
  userInfo: {
    firstname?: string;
    lastname?: string;
    birthDate?: string;
    email?: string;
    password?: string;
    profilImage?: File;
  };
}

const initialState: InitialeStateProps = {
  userInfo: {},
};

const userInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<object>) {
      state.userInfo = action.payload as InitialeStateProps["userInfo"];
    },
  },
});

export const { setUserInfo } = userInfo.actions;
export default userInfo.reducer;
