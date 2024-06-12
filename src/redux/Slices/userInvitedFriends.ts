// chatSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  usersId: number[];
}

const initialState: ChatState = {
  usersId: [],
};

const userInvitedFriends = createSlice({
  name: "userInvitedFriends",
  initialState,
  reducers: {
    setUserInvitedFriend(state, action: PayloadAction<number>) {
      state.usersId.push(action.payload);
    },
  },
});

export const { setUserInvitedFriend } = userInvitedFriends.actions;
export default userInvitedFriends.reducer;
